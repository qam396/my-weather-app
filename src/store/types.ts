export interface Weather {
    description: string
    icon: string
    id: string
    main: string
}

export interface Daily {
    weather: Weather[]
    temp: {
        day: number
        min: number
        max: number
        night: number
        eve: number
        morn: number
    }
    dt: number
}

export interface WeatherData {
    base: string
    clouds: {
        all: number
    }
    cod: number
    coord: {
        lon: number
        lat: number
    }
    dt: number
    id: number
    main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        tem_main: number
    }
    name: string
    sys: {
        country: string
        id: number
        sunrise: number
        sunset: number
        type: number
    }
    timezone: number
    visibility: number
    weather: Weather[]
    wind: {
        speed: number
        deg: number
    }
    daily: Daily[]
}
