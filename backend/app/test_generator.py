from .generator import ErrType, ErrField, base_scheme, alphabet


def test_err_add():
    s = "ABC"
    res = set([ErrType.ADD(s, i, "***") for i in range(1000)])

    assert {"*ABC", "A*BC", "AB*C", "ABC*"} == res


def test_err_swap():
    s = "ABCD"
    res = set([ErrType.SWAP(s, i) for i in range(1000)])

    assert {"BACD", "ACBD", "ABDC"} == res


def test_err_remove():
    s = "ABCD"
    res = set([ErrType.REMOVE(s, i) for i in range(1000)])

    assert {"BCD", "ACD", "ABD", "ABC"} == res


def test_base_scheme_keys():
    assert [enum.name for enum in ErrField] == [
        k.name for k in base_scheme(field=lambda *args: "").keys()
    ]


def test_alphabet():
    assert alphabet(iterations=2) == {
        ErrField.NAME: "Reda BarreraJames Carey",
        ErrField.ADDRESS: "Woodburn, 789 Princeton BendFort Lauderdale, 1048 Sonoma Point",
        ErrField.PHONE: "+16154989382+15617957610",
    }
