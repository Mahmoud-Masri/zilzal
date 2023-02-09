import { useEffect, useState } from "react"



export function useCurrentLocation() {
    const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading")
    const [location, setLocation] = useState({})
    useEffect(() => {
        if (navigator.geolocation) {
            const cb = (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                setStatus("loaded")
            }
            console.log(cb)
            navigator.geolocation.getCurrentPosition(cb)
        } else {
            setStatus("error")
        }
    }, [])

    return [status, location]
}
