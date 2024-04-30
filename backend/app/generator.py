from mimesis import Person
from mimesis.locales import Locale


def available_regions():
    return Locale.__members__.items()


def seed(number, seed):
    return number + seed

def generate(region, seed, mistakes):
    pass

def generate_many(skip, limit, region, seed, mistakes):
    res = []
    for i in range(skip, limit):
        print(i)
        
    return res