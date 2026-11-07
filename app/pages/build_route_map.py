import folium

# Your stops: (name, latitude, longitude). Change these to your own places.
stops = [
    ("Start", 37.7749, -122.4194),
    ("Middle", 37.7900, -122.4100),
    ("End", 37.8080, -122.4177),
]


def build_map(stops, filename="map.html"):
    # Center the map on the first stop
    my_map = folium.Map(location=[stops[0][1], stops[0][2]], zoom_start=13)

    # One marker per stop
    for name, lat, lon in stops:
        folium.Marker([lat, lon], popup=name, tooltip=name).add_to(my_map)

    # A line connecting the stops in order
    points = [[lat, lon] for _, lat, lon in stops]
    folium.PolyLine(points, color="blue", weight=4).add_to(my_map)

    my_map.save(filename)
    print(f"Map saved as {filename}")


build_map(stops, "/mnt/documents/map.html")
