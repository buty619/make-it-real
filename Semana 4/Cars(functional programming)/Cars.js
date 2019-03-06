
const cars =
[ { brand: 'Mazda', price: 5241, model: 1989 },
  { brand: 'Chevrolet', price: 4818, model: 1957 },
  { brand: 'Toyota', price: 2074, model: 2009 },
  { brand: 'Renault', price: 2395, model: 2012 },
  { brand: 'Mercedes Benz', price: 6324, model: 1994 },
  { brand: 'Renault', price: 4441, model: 1992 },
  { brand: 'Chevrolet', price: 6923, model: 1995 },
  { brand: 'Mercedes Benz', price: 4749, model: 1980 },
  { brand: 'BMW', price: 6046, model: 2005 },
  { brand: 'Toyota', price: 9630, model: 1970 },
  { brand: 'Renault', price: 10568, model: 2009 },
  { brand: 'Chevrolet', price: 9082, model: 2020 },
  { brand: 'BMW', price: 10850, model: 1951 },
  { brand: 'Mercedes Benz', price: 3267, model: 1998 },
  { brand: 'BMW', price: 10897, model: 2014 },
  { brand: 'Chevrolet', price: 3227, model: 1962 },
  { brand: 'Mercedes Benz', price: 3498, model: 1970 },
  { brand: 'Mazda', price: 4932, model: 1963 },
  { brand: 'Chevrolet', price: 7187, model: 1975 },
  { brand: 'Mercedes Benz', price: 7901, model: 1957 },
  { brand: 'BMW', price: 6826, model: 1999 },
  { brand: 'BMW', price: 10893, model: 1958 },
  { brand: 'Renault', price: 5393, model: 2001 },
  { brand: 'Ferrari', price: 10785, model: 1959 },
  { brand: 'Mercedes Benz', price: 7028, model: 2017 },
  { brand: 'BMW', price: 1423, model: 1978 },
  { brand: 'Ferrari', price: 10408, model: 1954 },
  { brand: 'Toyota', price: 4592, model: 1999 },
  { brand: 'Toyota', price: 9441, model: 1960 },
  { brand: 'Toyota', price: 6133, model: 1995 },
  { brand: 'Mercedes Benz', price: 8188, model: 1960 },
  { brand: 'Ferrari', price: 10588, model: 1986 },
  { brand: 'BMW', price: 1631, model: 1969 },
  { brand: 'Chevrolet', price: 10614, model: 1991 },
  { brand: 'Chevrolet', price: 2289, model: 1960 },
  { brand: 'Chevrolet', price: 2345, model: 1997 },
  { brand: 'Toyota', price: 7713, model: 1987 },
  { brand: 'Mazda', price: 4269, model: 2015 },
  { brand: 'Mercedes Benz', price: 4152, model: 1983 },
  { brand: 'Mazda', price: 4992, model: 2015 },
  { brand: 'BMW', price: 4293, model: 1977 },
  { brand: 'Renault', price: 10247, model: 1994 },
  { brand: 'Mercedes Benz', price: 5219, model: 1967 },
  { brand: 'Toyota', price: 10646, model: 2001 },
  { brand: 'BMW', price: 2446, model: 1984 },
  { brand: 'Mazda', price: 5397, model: 2001 },
  { brand: 'Ferrari', price: 3700, model: 1998 },
  { brand: 'Ferrari', price: 10897, model: 1965 },
  { brand: 'BMW', price: 5642, model: 2012 },
  { brand: 'Ferrari', price: 5305, model: 2006 },
  { brand: 'Chevrolet', price: 8433, model: 1950 },
  { brand: 'Mercedes Benz', price: 2560, model: 1952 },
  { brand: 'Mazda', price: 8163, model: 1980 },
  { brand: 'BMW', price: 9864, model: 1969 },
  { brand: 'Toyota', price: 5823, model: 2003 },
  { brand: 'Renault', price: 10355, model: 1961 },
  { brand: 'Renault', price: 1910, model: 1971 },
  { brand: 'Mazda', price: 10708, model: 2013 },
  { brand: 'Ferrari', price: 3782, model: 1964 },
  { brand: 'Toyota', price: 3155, model: 2010 },
  { brand: 'Ferrari', price: 5476, model: 1970 },
  { brand: 'Mercedes Benz', price: 6694, model: 1950 },
  { brand: 'Ferrari', price: 4021, model: 2000 },
  { brand: 'Toyota', price: 4070, model: 2014 },
  { brand: 'Chevrolet', price: 8979, model: 1955 },
  { brand: 'Mercedes Benz', price: 7918, model: 2001 },
  { brand: 'Chevrolet', price: 3338, model: 2004 },
  { brand: 'Mercedes Benz', price: 5013, model: 1985 },
  { brand: 'BMW', price: 6187, model: 1957 },
  { brand: 'Mercedes Benz', price: 9180, model: 1956 },
  { brand: 'Renault', price: 7404, model: 1965 },
  { brand: 'Toyota', price: 10900, model: 2009 },
  { brand: 'Renault', price: 3401, model: 1967 },
  { brand: 'Renault', price: 7991, model: 1958 },
  { brand: 'BMW', price: 9680, model: 1956 },
  { brand: 'Toyota', price: 5345, model: 1982 },
  { brand: 'Renault', price: 1808, model: 1960 },
  { brand: 'BMW', price: 1225, model: 1962 },
  { brand: 'Toyota', price: 7099, model: 1984 },
  { brand: 'Mercedes Benz', price: 2425, model: 1971 },
  { brand: 'Ferrari', price: 8509, model: 1985 },
  { brand: 'Mercedes Benz', price: 3884, model: 1982 },
  { brand: 'BMW', price: 6882, model: 1974 },
  { brand: 'Mercedes Benz', price: 10794, model: 1974 },
  { brand: 'Chevrolet', price: 9937, model: 1979 },
  { brand: 'BMW', price: 1849, model: 1989 },
  { brand: 'BMW', price: 5715, model: 1982 },
  { brand: 'Ferrari', price: 5938, model: 1950 },
  { brand: 'BMW', price: 3353, model: 1999 },
  { brand: 'Chevrolet', price: 10527, model: 1951 },
  { brand: 'Chevrolet', price: 1577, model: 1951 },
  { brand: 'Renault', price: 5029, model: 1985 },
  { brand: 'Toyota', price: 7809, model: 1973 },
  { brand: 'Toyota', price: 7808, model: 1999 },
  { brand: 'Toyota', price: 4444, model: 2001 },
  { brand: 'Renault', price: 4511, model: 1957 },
  { brand: 'Ferrari', price: 4462, model: 1991 },
  { brand: 'BMW', price: 8753, model: 2011 },
  { brand: 'Chevrolet', price: 4726, model: 1974 },
  { brand: 'Ferrari', price: 9541, model: 1970 } 
];

// function ferraris(inputFn){
//     return cars.filter(inputFn);
// }
// console.log(ferraris(cars => cars.brand === "Ferrari"));

function ferraris(){
    return cars.filter(cars => cars.brand === "Ferrari");
}
console.log(ferraris());

// function nineties(inputFn){
//     return cars.filter(inputFn);
// }
// console.log(nineties(cars => cars.model > 1980 && cars.model < 1990));

function nineties(){
    return cars.filter(cars => cars.model > 1980 && cars.model < 1990);
}
console.log(nineties());

function list(){
    return cars.map(cars => ("This " + cars.brand + " from " + cars.model + " costs $" + cars.price));
}
console.log(list());

function bmwSum(){
    return cars.filter(cars => cars.brand === "BMW").map(cars => cars.price).reduce((a,b) => a+b);
}

console.log(bmwSum());