const maxList = 100 * 10 ** 3;

function getLists() {
  const lists = [];
  for (let i = 0; i < maxList; i++) {
    // random between 0-10
    const rnd = Math.round(10 * Math.random());
    lists.push(rnd);
  }
  return lists;
}

function getUniqByObject(lists) {
  const results = [];
  const obj = {};
  const len = lists.length;
  for (let i = 0; i < len; i++) {
    const itm = lists[i];
    if (obj[itm] !== 1) {
      obj[itm] = 1;
      results.push(itm);
    }
  }
  return results;
}

function getUniqByMap(lists) {
  const results = [];
  const obj = new Map();
  const len = lists.length;
  for (let i = 0; i < len; i++) {
    const itm = lists[i];
    if (obj.get(itm) !== 1) {
      obj.set(itm, 1);
      results.push(itm);
    }
  }
  return results;
}

function getUniqBySet(lists) {
  const results = new Set();
  const len = lists.length;
  for (let i = 0; i < len; i++) {
    const itm = lists[i];
    results.add(itm);
  }
  return results;
}

function testQualityFn() {
  const lists = getLists();
  // obj
  const oLists = getUniqByObject(lists);
  const mLists = getUniqByMap(lists);
  const sLists = getUniqBySet(lists);

  console.log("len: " + lists.length);
  console.log("obj: " + oLists);
  console.log("Map: " + mLists);
  console.log("Set: " + [...sLists]);
}

function testSpeed(testFn, fnName) {
  const lists = getLists();

  const startTime = performance.now();
  for (let i = 0; i < 100; i++) {
    testFn(lists);
  }
  const endTime = performance.now();
  const timeTaken = ((endTime - startTime) * 0.01).toFixed(3);

  console.log(`-----------------`);
  console.log(`testing ${fnName}`);
  console.log(`lists len: ` + lists.length);
  console.log("average time: " + `${timeTaken} ms`);
  console.log(`-----------------`);
}

testSpeed(getUniqByObject, "obj");
testSpeed(getUniqByMap, "map");
testSpeed(getUniqBySet, "set");
