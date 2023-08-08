import { Mobius } from '../src';
type Scalar = {
    Date: Date;
};
declare const mobius: Mobius<"\n    directive @deprecated(reason: String = \"EOL\") on FIELD_DEFINITION\n    scalar Date\n\n    interface A {\n        A: String!\n    }\n\n    # Hello World\n    fragment Frag on A {\n        A\n    }\n\n    # Hello World\n    enum CD {\n        C\n        D\n    }\n\n    # Hello World\n    enum EF {\n        # Hello World\n        E\n        # Hello World\n        F\n    }\n\n    type B implements A {\n        B: String!\n    }\n\n    type D {\n        nested: String!\n    }\n\n    type C {\n        C: String\n        D: D!\n    }\n\n    union CDEF = CD | EF\n    union ABC = B | C\n\n    fragment ABCFrag on ABC {\n        A\n        B\n    }\n\n    type Query {\n        Hi(cdef: CDEF!): ABC!\n        Hello(word: String!, again: D!): String!\n    }\n", Scalar, {
    Query: {
        Hi: (p: {
            cdef: "D" | "C" | "E" | "F" | {};
        }) => {
            B: string;
            A: string;
            C: string | null;
            D: {
                nested: string;
            };
        };
        Hello: (p: {
            word: string;
            again: {
                nested: string;
            };
        }) => string;
    };
    A: {
        A: string;
    };
    CD: "D" | "C";
    EF: "E" | "F";
    B: {
        B: string;
        A: string;
    };
    D: {
        nested: string;
    };
    C: {
        C: string | null;
        D: {
            nested: string;
        };
    };
    CDEF: "D" | "C" | "E" | "F" | {};
    ABC: {
        B: string;
        A: string;
        C: string | null;
        D: {
            nested: string;
        };
    };
    Fragment: {
        Frag: {
            A: string;
        };
        ABCFrag: {
            A: string;
            B: string;
        };
    };
    Mutation: {};
    Subscription: {};
    Date: Date;
}>;
export type T = (typeof mobius)['klein'];
export {};
