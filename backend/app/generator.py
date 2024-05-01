from functools import lru_cache
from mimesis.locales import Locale
from mimesis import Field, Fieldset, Schema
import math
from enum import Enum


class ErrField(Enum):
    NAME = "name"
    ADDRESS = "address"
    PHONE = "phone"


@lru_cache
def alphabet(locale=Locale.DEFAULT, iterations=1000) -> dict:
    field = Field(locale=locale, seed=0x00)
    schema = Schema(schema=lambda: base_scheme(field), iterations=iterations)
    data = schema.create()
    keys = base_scheme(field).keys()
    return {key: "".join([el[key] for el in data]) for key in keys}


class ErrType(Enum):
    @classmethod
    def _add(cls, s: str, index: int, alphabet: str):
        i = index % (len(s) + 1)
        symbol = alphabet[index % len(alphabet)]
        return s[:i] + symbol + s[i:]

    @classmethod
    def _remove(cls, s: str, index: int, *args):
        if len(s) == 0:
            return s
        i = index % len(s)
        return s[:i] + s[i + 1 :]

    @classmethod
    def _swap(cls, s: str, index: int, *args):
        if len(s) < 2:
            return s

        i = index % (len(s) - 1)
        return s[:i] + s[i + 1] + s[i] + s[i + 2 :]

    REMOVE = _remove
    ADD = _add
    SWAP = _swap

    @classmethod
    def Errors(cls):
        return [cls.REMOVE, cls.ADD, cls.SWAP]


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


def generate(region: str, seed, mistakes):
    loc = Locale[region.upper()]

    p, i = math.modf(mistakes)
    err_int = int(i)

    field = Field(locale=loc, seed=seed)
    fieldset = Fieldset(locale=loc, seed=seed)

    return base_scheme(field) | {
        "id": field("random.randbytes", key=lambda s: s.hex()),
        "err_count": field(
            "random.weighted_choice", choices={err_int + 1: p, err_int: 1 - p}
        ),
        "errors": {
            "field": fieldset("random.choice_enum_item", enum=ErrField, i=err_int + 1),
            "type": fieldset(
                "random.choice_enum_item", enum=ErrType.Errors(), i=err_int + 1
            ),
            "index": fieldset("integer_number", i=err_int + 1),
        },
    }


def apply_errors(record, region):
    err_count = record["err_count"]
    if not err_count:
        return record

    a = alphabet(Locale[region.upper()])
    errs = record["errors"]
    for _, field, err_type, index in zip(
        range(err_count), errs["field"], errs["type"], errs["index"]
    ):
        record[field] = err_type(record[field], index, a[field])

    return record


def remove_fields(record):
    del record['errors']
    del record['err_count']
    return record


@lru_cache
def prepare_row(i, region, user_seed, mistakes):
    new_seed = seed(i, user_seed, region)
    record = generate(region, seed=new_seed, mistakes=mistakes)
    return {"index": i} | remove_fields(apply_errors(record, region))


def generate_many(skip, limit, region, user_seed, mistakes):
    res = []
    for i in range(skip + 1, limit + skip + 1):
        res.append(prepare_row(i, region, user_seed=user_seed, mistakes=mistakes))

    return res
