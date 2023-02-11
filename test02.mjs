const maxList = 100 * 10 ** 3;

function getArrayLists() {
  const lists = [];
  for (let i = 0; i < maxList; i++) {
    // random between 0-10
    const rnd = Math.round(10 * Math.random());
    lists.push(rnd);
  }
  return lists;
}
function getMapLists() {
  const mapList = new Map();

  for (let i = 0; i < maxList; i++) {
    // random between 0-10
    const rnd = Math.round(10 * Math.random());
    mapList.set(i, rnd);
  }
  return mapList;
}
function getSetLists() {
  const setList = new Set();

  for (let i = 0; i < maxList; i++) {
    // random between 0-10
    const rnd = Math.round(10 * Math.random());
    setList.add([i, rnd]);
  }
  return setList;
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

/**
 *
 * @param {Map<number,number>} lists
 * @returns
 */
function getUniqByMap(lists) {
  const results = new Map();
  for (const [k, v] of lists) {
    if (results.get(v) !== 1) {
      results.set(v, 1);
    }
  }
  // we could get result by [...result.keys]
  // however this will wasting time
  // converting it to array
  return results;
}

/**
 *
 * @param {Set<[number,number]>} lists
 * @returns
 */
function getUniqBySet(lists) {
  const results = new Set();

  for (const itm of lists) {
    results.add(itm[1]);
  }
  return results;
}

function testQualityFn() {
  const oLists = getArrayLists();
  const mLists = getMapLists();
  const sLists = getSetLists();

  const uO = getUniqByObject(oLists);
  const uM = getUniqByMap(mLists);
  const uS = getUniqBySet(sLists);

  function log(name, uniq, size) {
    console.log("-----------------------");
    console.log(name);
    console.log(`len: ${size}`);
    console.log(`uniq: ${[...uniq]}`);
    console.log("-----------------------");
  }
  log("object", uO, oLists.length);
  log("map", uM, mLists.size);
  log("set", uS, sLists.size);
}

function testSpeed(listFn, UniqFn, name) {
  const lists = listFn();

  const startTime = performance.now();
  for (let i = 0; i < 100; i++) {
    UniqFn(lists);
  }
  const endTime = performance.now();
  const timeTaken = ((endTime - startTime) * 0.01).toFixed(3);

  const listLen = lists.length || lists.size;

  console.log(`-----------------`);
  console.log(`testing ${name}`);
  console.log(`lists len: ` + listLen);
  console.log("average time: " + `${timeTaken} ms`);
  console.log(`-----------------`);
}

testSpeed(getArrayLists, getUniqByObject, "object");
testSpeed(getMapLists, getUniqByMap, "map");
testSpeed(getSetLists, getUniqBySet, "set");
