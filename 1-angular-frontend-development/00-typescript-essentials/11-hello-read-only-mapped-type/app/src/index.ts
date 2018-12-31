type Friend = Readonly<{ name: string, lastName: string }>;

class Person {
  readonly bestFriend: Friend = { name: 'Jason', lastName: 'Isaacs' };

  changeFriend() {
    // this.bestFriend = { name: 'Idris', lastName: 'Elba' }; // Err: cannot assign because it is a read-only property
  }

  changeFriendName() {
    // this.bestFriend.name = 'Idris';    // Err: cannot assign to readonly property
    // this.bestFriend.lastName = 'Elba'; // Err: cannot assign to readonly property
  }
}

const p = new Person();
p.changeFriend();
console.log(`Hello to ${ p.bestFriend.name } ${ p.bestFriend.lastName }`);
