const Deprecated = (deprecationReason: string) => {
  return (
    target: any,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    const originalMethod = propertyDescriptor.value;
    propertyDescriptor.value = function (...args: any[]) {
      console.warn(
        `Method ${memberName} is deprecated with reason: ${deprecationReason}`
      );
      // Llama al método original con los argumentos y devuelve su resultado
      return originalMethod.apply(this, args);
    };
    return propertyDescriptor;
  };
};

export class Pokemon {
  constructor(public readonly id: number, public name: string) {}

  scream() {
    console.log(`${this.name.toUpperCase()}!!`);
  }

  @Deprecated("Most use speak2 method instead")
  speak() {
    console.log(`${this.name}, ${this.name}!`);
  }

  @Deprecated("Most use speak3 method instead")
  speak2() {
    console.log(`${this.name}, ${this.name}!!!`);
  }
}

const charmander = new Pokemon(4, "Charmander");

charmander.speak();
