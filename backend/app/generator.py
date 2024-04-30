from mimesis.locales import Locale
from mimesis import Field, Fieldset
import math
from enum import Enum


class ErrField(Enum):
    NAME = "name"
    ADDRESS = "address"
    PHONE = "phone"


def available_regions():
    return Locale.__members__.items()


def seed(number: int, seed: str, region: str):
    return f"{seed}{number}{region}"


def generate(region: str, seed, mistakes):
    loc = Locale[region.upper()]

    p, i = math.modf(mistakes)
    err_int = int(i)

    field = Field(locale=loc, seed=seed)
    fieldset = Fieldset(locale=loc, seed=seed)

    return {
        "id": field("random.randbytes", key=lambda s: s.hex()),
        ErrField.NAME: field("full_name"),
        ErrField.ADDRESS: f'{field("city")}, {field("address")}',
        ErrField.PHONE: field("telephone"),
        "err_count": field(
            "random.weighted_choice", choices={err_int + 1: p, err_int: 1 - p}
        ),
        "errors": {
            "field": fieldset("random.choice_enum_item", enum=ErrField, i=err_int + 1),
            "index": fieldset("integer_number", i=err_int + 1),
        },
    }


def generate_many(skip, limit, region, user_seed, mistakes):
    res = []
    for i in range(skip + 1, limit + skip + 1):
        new_seed = seed(i, user_seed, region)
        print(i, new_seed)

        res.append((i, generate(region, seed=new_seed, mistakes=mistakes)))

    return res
