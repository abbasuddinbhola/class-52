let tasklist = [
    {
        id: 1,
        title: "title one",
        isDone: false,
    },
    {
        id: 1,
        title: "title one",
        isDone: false,
    },
    {
        id: 1,
        title: "title one",
        isDone: false,
    },
    {
        id: 1,
        title: "title one",
        isDone: false,
    },
    {
        id: 1,
        title: "title one",
        isDone: false,
    },
    {
        id: 1,
        title: "title one",
        isDone: false,
    },
    {
        id: 1,
        title: "title one",
        isDone: false,
    },

]

console.log(tasklist);

// let updateTaskList = [];

// for (let i = 0; i < tasklist.length; i++) {
//     // console.log(tasklist[i]);

//     updateTaskList.push({
//         ...tasklist[i],
//         test: "This is test",
//     })

// }

let updateTaskList = tasklist.map((data) => {
    return {
        ...data,
        test: "test"
    }
});

console.log(updateTaskList);
