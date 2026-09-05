import { Image, Moon, Satellite } from 'lucide-react';

export const navBarRoutes = [
    { icon: Moon, label: "Lua", route: "/lua", description: "Satélite Natural da Terra" },
    { icon: Image, label: "APOD", route: "/APOD", description:"Astronomy Picture of the Day" },
    { icon: Satellite, label: "ISS", route: "/ISS", description: "Estação Espacial Internacional" }
]