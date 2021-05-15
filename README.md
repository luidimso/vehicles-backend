# Vehicles management backend

## How to run project:

Note: It is necessary to have NodeJS installed

1. Clone the project on your local machine:

```git clone https://github.com/luidimso/vehicles-backend.git```

2. Install project dependencies:

```npm i```

3. Run the project script to start the Node server:

```npm start```

4. The server will be running at the following address: ```http://localhost:3000```


## Documentation of endpoints

### [GET] List vehicles
```/api/v1/vehicle```

### [GET] List options to filter vehicles
```/api/v1/vehicle/filter```

### [POST] Create vehicle
```/api/v1/vehicle```

Body:

```
{
  "placa": string,
  "chassi": string,
  "renavam": string,
  "modelo": string,
  "marca": string,
  "ano": number
}
```

### [PUT] Update vehicle
```/api/v1/vehicle/{id}```

Body:

```
{
  "placa": string,
  "chassi": string,
  "renavam": string,
  "modelo": string,
  "marca": string,
  "ano": number
}
```

### [DELETE] Delete vehicle
```/api/v1/vehicle/{id}```