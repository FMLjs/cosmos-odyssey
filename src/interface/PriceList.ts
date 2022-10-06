export interface PriceList {
    id: string
    validUntil: Date
    routes: [Route]
}

interface Route {
    id: string
    routeInfo: RouteInfo
    prividers: [Provider]
}

interface RouteInfo {
    id: string
    from: Planet
    to: Planet
    distance: number
}

interface Planet {
    id: string
    name: string
}

interface Provider {
    id: string
    company: Company
    price: number
    flighStart: Date
    flightEnd: Date
}

interface Company {
    id: string
    name: string
}