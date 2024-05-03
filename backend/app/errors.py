from enum import Enum
from functools import cache


class ErrField(Enum):
    NAME = "name"
    ADDRESS = "address"
    PHONE = "phone"


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
    def get_values(cls):
        return [cls.REMOVE, cls.ADD, cls.SWAP]

    

@cache
def enum_by_index(enum, index):
    values = enum.get_values() if enum is ErrType else enum
    if isinstance(index, int) and 0 <= index < len(values):
        return list(values)[index]
    raise IndexError("Index out of range")