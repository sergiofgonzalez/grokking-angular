function UIComponent(html: string) {
  console.log(`The decorator received ${ html }`);
  return (target) => {
    console.log(`Creating UI component from \n ${ target }`);
  };
}

@UIComponent('<h1>Hello, Shopper!</h1>')
class Shopper {
  constructor(private name: string) {}
}
