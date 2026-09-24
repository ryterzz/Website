const bands = [
    "Metallica",
    "Slipknot",
    "Deftones",
    "Korn",
    "Linkin Park",
    "System of a Down",
    "Limp Bizkit",
    "Disturbed",
    "Avenged Sevenfold",
    "Bring Me The Horizon",
    "Pierce The Veil",
    "My Chemical Romance",
    "Three Days Grace",
    "Breaking Benjamin",
    "Foo Fighters",
    "Nirvana",
    "Alice In Chains",
    "Soundgarden",
    "Pearl Jam",
    "Rage Against The Machine",
    "Red Hot Chili Peppers",
    "Green Day",
    "Blink-182",
    "Sum 41",
    "Paramore",
    "Fall Out Boy",
    "The Offspring",
    "Queens of the Stone Age",
    "Nine Inch Nails",
    "Pantera",
    "Megadeth",
    "Slayer",
    "Iron Maiden",
    "Black Sabbath",
    "Judas Priest",
    "Motorhead",
    "Gojira",
    "Lamb of God",
    "Tool",
    "Rammstein"
];

const button = document.getElementById("pick");

button.addEventListener("click", () => {
    const random = Math.floor(Math.random() * bands.length);

    document.getElementById("result").textContent = bands[random];
});

// never trust john this shits so hard to do but it works so i guess thats good enough for now! <3