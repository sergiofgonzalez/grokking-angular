class Person {
  readonly bestFriend: { name: string } = { name: 'Idris'};

  changeFriend() {
    // this.bestFriend = { name: 'Jason' }; // Err: cannot assign to readonly property
  }

  changeFriendName() {
    this.bestFriend.name = 'Jason'; // OK: object ref stays the same, the value has changed though
  }
}

class ImmutablePerson {
  readonly bestFriend: { readonly name: string } = { name: 'Jason' };

  changeFriend() {
    // this.bestFriend = { name: 'Jason' }; // Err: cannot assign to readonly property
  }

  changeFriendName() {
    // this.bestFriend.name = 'Jason'; // Err: neither the object, nor its internal state can be changed
  }
}
