from functools import lru_cache
from mimesis.locales import Locale
from mimesis import Field, Schema
import math
from enum import Enum

from mimesis import Person, Address
from mimesis.random import Random


@lru_cache
def person(locale):
    return Person(locale=locale)


@lru_cache
def address(locale):
    return Address(locale=locale)


@lru_cache
def alphabet(locale=Locale.DEFAULT, iterations=1000) -> dict:
    field = Field(locale=locale, seed=0x00)
    schema = Schema(schema=lambda: base_scheme(field), iterations=iterations)
    data = schema.create()
    keys = base_scheme(field).keys()
    return {key: "".join([el[key] for el in data]) for key in keys}


def generate(region: str, seed, mistakes):
    loc = Locale[region.upper()]

    prs = person(loc)
    adr = address(loc)
    rnd = Random(seed)

    prs.reseed(seed=seed)
    adr.reseed(seed=seed)

    p, i = math.modf(mistakes)
    err_int = int(i)

    return {
        ErrField.NAME: prs.full_name(),
        ErrField.ADDRESS: f"{adr.city()}, {adr.address()}",
        ErrField.PHONE: prs.telephone(),
        "id": rnd.randbytes().hex(),
        "err_count": rnd.weighted_choice(choices={err_int + 1: p, err_int: 1 - p}),
        "errors": {
            "field": rnd.randints(n=err_int + 1, a=0, b=len(ErrField)),
            "type": rnd.randints(n=err_int + 1, a=0, b=len(ErrType.Errors())),
            "index": rnd.randints(n=err_int + 1, a=-1000, b=1000),
        },
    }


def apply_errors(record, region):
    err_count = record["err_count"]
    if not err_count:
        return record

    a = alphabet(Locale[region.upper()])

    fields = {key: list(record[key]) for key in ErrField}

    errs = record["errors"]
    for _, field_index, err_type, index in zip(
        range(err_count), errs["field"], errs["type"], errs["index"]
    ):
        field = ErrField.get_by_index(field_index)
        ErrType.get_by_index(err_type)(fields[field], index, a[field])

    for key in fields:
        record[key] = "".join(fields[key])

    return record


class ErrField(Enum):
    NAME = "name"
    ADDRESS = "address"
    PHONE = "phone"

    @classmethod
    def get_by_index(cls, index):
        if isinstance(index, int) and 0 <= index < len(cls):
            return list(cls)[index]
        raise IndexError("Index out of range")


class ErrType(Enum):
    @classmethod
    def _add(cls, s: list[str], index: int, alphabet: str):
        i = index % (len(s) + 1)
        symbol = alphabet[index % len(alphabet)]
        s.insert(i, symbol)
        return s

    @classmethod
    def _remove(cls, s: list[str], index: int, *args):
        if len(s) == 0:
            return s
        i = index % len(s)
        s.pop(i)
        return s

    @classmethod
    def _swap(cls, s: list[str], index: int, *args):
        if len(s) < 2:
            return s

        i = index % (len(s) - 1)
        s[i], s[i + 1] = s[i + 1], s[i]
        return s

    REMOVE = _remove
    ADD = _add
    SWAP = _swap

    @classmethod
    def Errors(cls):
        return [cls.REMOVE, cls.ADD, cls.SWAP]

    @classmethod
    def get_by_index(cls, index):
        if isinstance(index, int) and 0 <= index < len(cls.Errors()):
            return cls.Errors()[index]

        raise IndexError("Index out of range")


def available_regions():
    return Locale.__members__.items()


def seed(number: int, seed: str, region: str):
    return f"{seed}{number}{region}"


def base_scheme(field):
    return {
        ErrField.NAME: field("full_name"),
        ErrField.ADDRESS: f'{field("city")}, {field("address")}',
        ErrField.PHONE: field("telephone"),
    }


@lru_cache
def create_field(locale):
    return Field(locale=locale)


def remove_fields(record):
    del record["errors"]
    del record["err_count"]
    return record


def prepare_row(i, region, user_seed, mistakes):
    new_seed = seed(i, user_seed, region)
    record = generate(region, seed=new_seed, mistakes=mistakes)
    return {"index": i} | remove_fields(apply_errors(record, region))


def generate_many(skip, limit, region, user_seed, mistakes):
    return [
        prepare_row(i, region, user_seed=user_seed, mistakes=mistakes)
        for i in range(skip + 1, limit + skip + 1)
    ]
