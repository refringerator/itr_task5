import math

from mimesis.random import Random
from mimesis.locales import Locale

from .errors import ErrField, ErrType, enum_by_index
from .my_random import generate_alphabet, person, address


def generate(locale: Locale, seed, mistakes):
    prs = person(locale)
    adr = address(locale)
    rnd = Random(seed)

    prs.reseed(seed=seed)
    adr.reseed(seed=seed)

    p, i = math.modf(mistakes)
    mistakes_int = int(i)

    return {
        ErrField.NAME: prs.full_name(),
        ErrField.ADDRESS: f"{adr.city()}, {adr.address()}",
        ErrField.PHONE: prs.telephone(),
        "id": rnd.randbytes().hex(),
        "err_count": rnd.weighted_choice(choices={mistakes_int + 1: p, mistakes_int: 1 - p}),
        "errors": {
            "field": rnd.randints(n=mistakes_int + 1, a=0, b=len(ErrField)),
            "type": rnd.randints(n=mistakes_int + 1, a=0, b=len(ErrType.get_values())),
            "index": rnd.randints(n=mistakes_int + 1, a=-1000, b=1000),
        },
    }


def apply_errors(record, locale):
    err_count = record["err_count"]
    if not err_count:
        return record

    alphabet = generate_alphabet(locale)

    fields = {key: list(record[key]) for key in ErrField}

    errs = record["errors"]
    for _, field_index, err_type_index, rnd_index in zip(
        range(err_count), errs["field"], errs["type"], errs["index"]
    ):
        field_key = enum_by_index(ErrField, field_index)
        err_function = enum_by_index(ErrType, err_type_index)
        err_function(fields[field_key], rnd_index, alphabet[field_key])

    for key in fields:
        record[key] = "".join(fields[key])

    return record


def available_regions():
    return Locale.__members__.items()


def seed(number: int, seed: str, region: str):
    return f"{seed}{number}{region}"


def remove_fields(record):
    del record["errors"]
    del record["err_count"]
    return record


def prepare_row(i, region, user_seed, mistakes, locale):
    row_seed = seed(i, user_seed, region)
    record = generate(locale, seed=row_seed, mistakes=mistakes)
    return {"index": i} | remove_fields(apply_errors(record, region))


def generate_many(skip, limit, region, user_seed, mistakes):
    locale = Locale[region.upper()]
    return [
        prepare_row(i, region, user_seed=user_seed, mistakes=mistakes, locale=locale)
        for i in range(skip + 1, limit + skip + 1)
    ]
