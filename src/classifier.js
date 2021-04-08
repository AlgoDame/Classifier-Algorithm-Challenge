/**
 * This is the entry point to the program
 * Question 1 - Classifier
 *
 * @param {any} input Array of student objects
 */
function classifier(input) {
  // deeply copy input into variable myInput
  let myInput = JSON.parse(JSON.stringify(input));

  // get age of each member
  for (let i = 0; i < myInput.length; i++) {
    let theDob = new Date(myInput[i].dob).getFullYear();
    let currentYear = new Date().getFullYear();
    let age = currentYear - theDob;
    myInput[i].age = age;
  }

  if (myInput.length == 0) {
    return { noOfGroups: 0 };
  }
  // sort array by age in ascending order
  myInput.sort((a, b) => {
    return a.age - b.age;
  });

  // group students
  let studentStack = [];
  let groups = [];
  studentStack.push(myInput[0]);

  for (let i = 1; i < myInput.length; i++) {
    if (studentStack.length <= 2 && myInput[i].age - studentStack[0].age <= 5) {
      studentStack.push(myInput[i]);
    } else {
      groups.push(studentStack);
      studentStack = [];
      studentStack.push(myInput[i]);
    }
  }

  if (studentStack.length !== 0) {
    groups.push(studentStack);
  }

  let result = {};
  let noOfGroups = groups.length;
  result.noOfGroups = noOfGroups;
  console.log(result);

  for (let i = 0; i < groups.length; i++) {
    let sumOfAge = 0;
    let regNos = [];
    for (let j = 0; j < groups[i].length; j++) {
      sumOfAge += groups[i][j].age;
      regNos.push(Number(groups[i][j].regNo));
    }
    regNos.sort((a, b) => a - b);
    let group = `group${[i + 1]}`;
    result[group] = {
      members: [],
      oldest: groups[i][groups[i].length - 1].age,
      sum: sumOfAge,
      regNos: regNos,
    };

    for (let k = 0; k < groups[i].length; k++) {
      result[group].members.push({
        name: groups[i][k].name,
        age: groups[i][k].age,
        dob: groups[i][k].dob,
        regNo: groups[i][k].regNo,
      });
    }
  }

  return result;
}

