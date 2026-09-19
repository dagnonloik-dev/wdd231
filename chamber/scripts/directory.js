const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("show");
});

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Error loading members:", error);

        membersContainer.innerHTML = "<p>Unable to load the member directory.</p>";
    }
}


function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");

        card.classList.add("member-card");

        const membershipName = getMembershipName(member.membership);

        card.innerHTML = `
            <img 
                src="images/${member.image}" 
                alt="${member.name} logo"
                loading="lazy"
            >

            <h3>${member.name}</h3>
            <p>${member.description}</p>

            <p>
                <strong>Address:</strong>
                ${member.address}
            </p>

            <p>
                <strong>Phone:</strong>
                ${member.phone}
            </p>

            <p>
                <strong>Membership:</strong>
                ${membershipName}
            </p>

            <p>
                <a href="${member.website}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                >
                    Visit Website
                </a>
            </p>
        `;

        membersContainer.appendChild(card);
    });
}


function getMembershipName(level) {
    if (level === 3) {
        return "Gold";
    }

    if (level === 2) {
        return "Silver";
    }

    return "Member";
}


gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});


listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

getMembers();