// @flow

// Co/contravariance in object properties

type Named = { name: ?string }; // Invariant: ?string (i.e. string | null | void, i.e. _union_ of string, null, void types)
// type Named = { +name: ?string }; // Covariant: ?string or subtypes (i.e. string or null or void, or some combination of them)
// type Named = { -name: ?string }; // Contravariant: ?string or supertypes (i.e. string | null | void | ...)

const bob: Named = { name: "bob" }; // Inferred to be ?string
const bobCasted: Named = ({ name: "bob" }: { name: ?string }); // Defined explicitly as ?string
const bobNonNull: Named = ({ name: "bob" }: { name: string }); // Subtype of ?string
const nulled: Named = ({ name: null }: { name: null }); // Subtype of ?string

const cutiepi: Named = { name: 3.14 }; // Inferred to be supertype of ?string
const cutiepiCasted: Named = ({ name: 3.14 }: { name: ?string | number }); // Defined explicitly as supertype of ?string
const cutiepiUnrelated: Named = ({ name: 3.14 }: { name: number }); // Unrelated to ?string; will never work

// Function typing

type Animal = { name: string };
type Dog = Animal & { tagColor: number };
type Greyhound = Greyhound & { numHounds: number };

function pushDog(dog: Dog): void {}
// Allow function types to be contravariant in their argument type
const pushAnimal: (_: Animal) => void = pushDog;
const pushGreyhound: (_: Greyhound) => void = pushDog;

function giveDog(): Dog {
  return (0: any); // Some value, irrelevant to this example
}
// Allow function types to be covariant in their return type
const giveAnimal: () => Animal = giveDog;
const giveGreyhound: () => Greyhound = giveDog;

// Subclassing

class AnimalShelter {
  add(animal: Animal) {}
  remove(): Animal {
    return (0: any);
  }
}

class DogShelter extends AnimalShelter {
  add(animal: Dog) {}
  remove(): Dog {
    return (0: any);
  }
}
