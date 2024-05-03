from functools import cache

from mimesis import Field, Locale, Schema
from mimesis import Person, Address

from .errors import ErrField


def base_scheme(field):
    return {
        ErrField.NAME: field("full_name"),
        ErrField.ADDRESS: f'{field("city")}, {field("address")}',
        ErrField.PHONE: field("telephone"),
    }


@cache
def generate_alphabet(locale=Locale.DEFAULT, iterations=1000) -> dict:
    field = Field(locale=locale, seed=0x00)
    schema = Schema(schema=lambda: base_scheme(field), iterations=iterations)
    data = schema.create()
    keys = base_scheme(field).keys()
    return {key: "".join([el[key] for el in data]) for key in keys}


@cache
def person(locale):
    return Person(locale=locale)


@cache
def address(locale):
    return Address(locale=locale)

@cache
def possible_indexes_list(min=-1000, max=1000):
    return [i for i in range(min, max)]