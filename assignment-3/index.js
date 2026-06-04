const express = require('express');
const app = express();

app.use(express.json());


const states = [
  { id: 1, name: "Andhra Pradesh", population: 49386799, literacyRate: 67.02, annualBudget: 279279, gdp: 14000000 },
  { id: 2, name: "Arunachal Pradesh", population: 1383727, literacyRate: 65.38, annualBudget: 28000, gdp: 300000 },
  { id: 3, name: "Assam", population: 31205576, literacyRate: 72.19, annualBudget: 122000, gdp: 4500000 },
  { id: 4, name: "Bihar", population: 104099452, literacyRate: 49.70, annualBudget: 261885, gdp: 6500000 },
  { id: 5, name: "Chhattisgarh", population: 25545198, literacyRate: 70.28, annualBudget: 121500, gdp: 4000000 },
  { id: 6, name: "Goa", population: 1458545, literacyRate: 88.70, annualBudget: 25000, gdp: 800000 },
  { id: 7, name: "Gujarat", population: 63872399, literacyRate: 78.03, annualBudget: 243965, gdp: 21000000 },
  { id: 8, name: "Haryana", population: 25351462, literacyRate: 75.55, annualBudget: 180000, gdp: 9000000 },
  { id: 9, name: "Himachal Pradesh", population: 6864602, literacyRate: 82.80, annualBudget: 50000, gdp: 2000000 },
  { id: 10, name: "Jharkhand", population: 32988134, literacyRate: 66.41, annualBudget: 110000, gdp: 4500000 },
  { id: 11, name: "Karnataka", population: 61095297, literacyRate: 75.36, annualBudget: 275000, gdp: 18000000 },
  { id: 12, name: "Kerala", population: 33406061, literacyRate: 94.00, annualBudget: 150000, gdp: 12000000 },
  { id: 13, name: "Madhya Pradesh", population: 72626809, literacyRate: 69.32, annualBudget: 240000, gdp: 10000000 },
  { id: 14, name: "Maharashtra", population: 112374333, literacyRate: 82.34, annualBudget: 340000, gdp: 35000000 },
  { id: 15, name: "Manipur", population: 2855794, literacyRate: 79.85, annualBudget: 32000, gdp: 600000 },
  { id: 16, name: "Meghalaya", population: 2966889, literacyRate: 75.48, annualBudget: 30000, gdp: 500000 },
  { id: 17, name: "Mizoram", population: 1097206, literacyRate: 91.33, annualBudget: 25000, gdp: 400000 },
  { id: 18, name: "Nagaland", population: 1978502, literacyRate: 79.55, annualBudget: 27000, gdp: 500000 },
  { id: 19, name: "Odisha", population: 41974218, literacyRate: 72.87, annualBudget: 200000, gdp: 8000000 },
  { id: 20, name: "Punjab", population: 27743338, literacyRate: 75.84, annualBudget: 180000, gdp: 11000000 },
  { id: 21, name: "Rajasthan", population: 68548437, literacyRate: 66.11, annualBudget: 225000, gdp: 14000000 },
  { id: 22, name: "Sikkim", population: 610577, literacyRate: 81.42, annualBudget: 15000, gdp: 200000 },
  { id: 23, name: "Tamil Nadu", population: 72147030, literacyRate: 80.09, annualBudget: 300000, gdp: 22000000 },
  { id: 24, name: "Telangana", population: 35003674, literacyRate: 72.80, annualBudget: 290000, gdp: 15000000 },
  { id: 25, name: "Tripura", population: 3673917, literacyRate: 87.22, annualBudget: 25000, gdp: 700000 },
  { id: 26, name: "Uttar Pradesh", population: 199812341, literacyRate: 67.68, annualBudget: 350000, gdp: 25000000 },
  { id: 27, name: "Uttarakhand", population: 10086292, literacyRate: 78.82, annualBudget: 60000, gdp: 3000000 },
  { id: 28, name: "West Bengal", population: 91276115, literacyRate: 76.26, annualBudget: 310000, gdp: 16000000 }
];

//Route 1

app.get('/states', (req, res) => {
    let data = [];
    for (let i = 0; i < states.length; i++) {
        data.push(states[i].name);
    }
    res.status(200).json(data);
});

// Route 3

app.get('/states/highest-gdp', (req, res) => {
    if (!states || states.length === 0) {
        return res.status(404).json({ message: "data not found" });
    }

    let max = states[0].gdp; 
    let stateName = states[0].name;

    for (let i = 1; i < states.length; i++) {
        if (states[i].gdp > max) {
            max = states[i].gdp;
            stateName = states[i].name;
        }
    }

    res.status(200).json({
        state: stateName,
        highestGDP: max
    });
});


//Route 2


app.get('/states/:id', (req, res)=>{
    const id = Number(req.params.id);
    const data = states.find(u => u.id == id);

    if(data){
        res.status(200).json(data);
    }
    else{
        res.status(404).json({
            message: "State not found"
        })
    }
})


//route 4


app.post('/states', (req, res)=>{
    try{
  const {id, name, population, GDP} = req.body;

    const newState = {
        id: states.length + 1,
        name,
        population,
        GDP
    };
     states.push(newState);
    res.status(201).json(newState);

}
catch{
    res.status(404).json({
        message: "not found"
    })
}
})

//route 5

app.put('/states/:id', (req, res)=>{
    try{
    const id = Number(req.params.id);
    const data = states.findIndex(u=> u.id == id);
    const updateData = req.body;
    if(data !== -1){
          states[data] = {
            id: states[data].id,
            ...updateData
          }
    }
    res.status(201).json(states[data])
    }
    catch{
        res.status(501).json({
            message: "data can not be changed"
        })
    }
})


//route 6

app.put('/states/:id/annualbudget', (req, res)=>{
    try{
    const id = Number(req.params.id);
    const state = states.find(u=> u.id == id);
  

    state.annualBudget = req.body.annualBudget;

    res.status(201).json({
        message: "data changed successfully",
        updateBudget: state.annualBudget
    })
    }
    catch{
        res.status(501).json({
            message: "data not changed"
        })
    }
})


//route 7


app.put('/states/:id/population', (req, res)=>{
    try{
    const id = Number(req.params.id);
    const state = states.find(u => u.id == id);

    state.population = req.body.population

    res.status(200).json({
        message: "data changed successfullyy",
        name: state.name,
        updatedPop: state.population
    })

    }
    catch{
        res.status(500).json({
            message: "internal server error"
        })
    }
})


//route 8

app.patch('/states/:id/literacyrate', (req, res)=>{
    try{
    const id = Number(req.params.id);
    const state = states.find(u => u.id == id);

    state.literacyRate = req.body.literacyRate

    res.status(200).json({
        message: "data changed successfullyy",
        name: state.name,
        updatedLit: state.literacyRate
    })

    }
    catch{
        res.status(500).json({
            message: "please give proper id"
        })
    }
})


//route 9


app.patch('/states/:id/gdp', (req, res)=>{
    try{
    const id = Number(req.params.id);
    const state = states.find(u => u.id == id);

    state.gdp = req.body.gdp

    res.status(200).json({
        message: "data changed successfullyy",
        name: state.name,
        updatedGDP: state.gdp
    })

    }
    catch{
        res.status(500).json({
            message: "please give proper id"
        })
    }
})


//route 10


app.patch('/states/:id', (req, res)=>{
    const id = Number(req.params.id);
    const state = states.find(u => u.id == id);
    const updateData = req.body;

     for (let key in updateData) {
        state[key] = updateData[key];
    }

    res.status(201).json({
        message: "data changed successfully",
        state
    })
})



//route 11


app.delete('/states/:id', (req, res)=>{
    const id = Number(req.params.id);
    const data = states.findIndex(u=> u.id == id);
 if(data == -1){
        res.status(500).json({
            message: "invalid id"
        });
    }
     const deletedState = states.splice(data, 1);

      res.status(200).json({
        message: "State deleted successfully",
        deletedState: deletedState[0]
    });
})



//route 12

app.delete('/states/name/:statename', (req, res)=>{
    const name = String(req.params.statename.toLowerCase());
    const delState = states.find(u=> u.name.toLowerCase() == name.toLowerCase());
    if(delState == -1){
        res.status(500).json({
            message: "no state found"
        })
    }

    const state = states.splice(name, 1);

    res.status(200).json({
        message: "state deleted successfully",
        state: state[0]
    })
})



//route 13


app.delete('/states/low-literacy/:percentage', (req, res) => {
    const percentage = Number(req.params.percentage);
    let deletedStates = [];

    for (let i = 0; i < states.length; i++) {
        if (states[i].literacyRate < percentage) {
            const removed = states.splice(i, 1); 
            deletedStates.push(removed[0]);
            i--;
        }
    }

    res.status(201).json({
        message: "Data deleted successfully",
        deletedStates: deletedStates
    });
});

app.listen("3000", (req, res)=>{
    console.log("server is running on the 3000");
})