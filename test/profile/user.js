function assert(expected, actual, message) {
  if (JSON.stringify(expected) !== JSON.stringify(actual)) {
    alert(`${message}: expected ${expected}, but got ${actual}`);
  }
}

function testLoad() {
  const user = new User("test user", 1, [null, '1'], ['2', null]);
  user.updateName("new user name");
  user.addCredit(2);
  user.addChara(new Mark(1, "", null, null, "", null));
  user.addTatekan(new Mark(3, "", null, null, "", null));
  
  const updatedUser = User.load();
  assert("new user name", updatedUser.name, "userName");
  assert(3, updatedUser.credit, "creditNum");
  assert(['1', '1'], updatedUser.capturedCharas, "capturedCharas");
  assert(['2', null, '2'], updatedUser.capturedTatekans, "capturedTatekans");
}

function testInstance() {
  const user = new User("test user", 1, [null, '1'], ['2', null]);
  user.updateName("new user name");
  user.addCredit(2);
  user.addChara(new Mark(1, "", null, null, "", null));
  user.addTatekan(new Mark(3, "", null, null, "", null));
  
  assert("new user name", user.name, "userName");
  assert(3, user.credit, "creditNum");
  assert(['1', '1'], user.capturedCharas, "capturedCharas");
  assert(['2', null, '2'], user.capturedTatekans, "capturedTatekans");
}

testLoad();
testInstance();
