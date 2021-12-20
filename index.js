/*   ---- Some Notes ---- */
/*

Refactor Goals: 
	— profile creation and editing can be placed into the same function
	-- same goes for the social accounts
	- use a single modal for interfaces


*/

//#region Constructors

/*----------------------*/
/*--- CONSTRUCTORS  ----*/
/*----------------------*/

//AccountProfile is the main constructor for every Social Library profile
function AccountProfile(id, name, thumb, acctHandle, subscribed, type) {
	//numerical ID
	this.id = id;
	this.name = name;
	this.thumb = thumb;
	this.acctHandle = acctHandle;
	this.subscribed = subscribed;
	//type of profile ie. user/org/admin/etc.
	this.type = type;
	this.socials = new Array();
}

//Adds subscribe toggle function to the AccountProfile prototype
AccountProfile.prototype.subToggle = function () {
	this.subscribed == true
		? (this.subscribed = false)
		: (this.subscribed = true);
};

//SocProfile adds a social media profiles to a user profile
function SocProfile(id, network, handle, following, url) {
	this.socId = id;
	this.network = network;
	this.handle = handle;
	this.following = following;
	this.url = url;
}

//Establishes AccountProfile as the prototype
SocProfile.prototype = Object.create(AccountProfile.prototype);

//method for adding a social profile to an account
AccountProfile.prototype.addSocial = function (
	network,
	handle,
	following,
	url
) {
	//assign and ID to the profile
	const len = this.socials.length;
	let id = undefined;
	this.socials.length > 0 ? (id = this.socials.length) : (id = 0);

	//get or assign a URL if it doesn't exist — the difficult step is a LinkedIn URL, which has different URLs based on the type of profile (individual, school, company, showcase)
	if (url) {
		//do nothing & retain current url
	} else {
		//assign a url based on the social platform
		console.log(
			"no url given for " + this.name + " " + network + " profile, assigning..."
		);
		switch (network) {
			case "facebook":
				url = `https://facebook.com/${handle}`;
				break;
			case "twitter":
				url = `https://twitter.com/${handle}`;
				break;
			case "instagram":
				url = `https://instagram.com/${handle}`;
				break;
			case "linkedin":
				url = `https://www.linkedin.com/search/results/all/?keywords=${this.name}`;
				break;
			case "github":
				url = `https://www.github.com/${handle}`;
				break;
		}
	}
	const newSocProf = new SocProfile(id, network, handle, following, url);
	this.socials.push(newSocProf);
	return newSocProf;
};

//method for removing a social profile from an account using index
AccountProfile.prototype.rmSocial = function (socIndex) {
	if (this.socials[socIndex] === undefined) {
		console.log("This social profile does not exist");
		return;
	} else {
		console.log("Deleting " + this.socials[socIndex].network + " profile...");
		return delete this.socials[socIndex], console.log("deleted");
	}
};

//#endregion

/*----------------------*/
/*  ---- VARIABLES ---  */
/*----------------------*/

//#region DOM Constants

const addProfileForm = document.querySelector("#add-profile");
const addProfileSubmit = document.querySelector("#add-profile-submit");
const addSocialsModal = new bootstrap.Modal(
	document.getElementById("addSocialsModal")
);
const profileContainer = document.querySelector("#profile-container");
const customNameSpan = document.querySelector("#custom-name");
const addSocialsForm = document.querySelector("#add-socials");
const addSocialsSection = document.querySelector("#social-select-sect");
const addSocialsRowLink = document.querySelector("#add-social-row");
const viewProModal = new bootstrap.Modal(
	document.getElementById("viewProModal")
);
const editProModal = new bootstrap.Modal(
	document.getElementById("editProModal")
);

//#endregion

//#region Variables - Data & Forumulas //

let addCounter = 0;

let justinProf = new AccountProfile(
	0,
	"Justin Duplain",
	"../img/default_profile.jpg",
	"pmentropy",
	true,
	"individual"
);

let scfCoding = new AccountProfile(
	1,
	"SCF Coding Academy",
	"https://scontent.fzty3-2.fna.fbcdn.net/v/t1.6435-9/156961501_108685391286757_5786298160784722473_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=s-VCDbiMCoAAX-vhqL1&_nc_ht=scontent.fzty3-2.fna&oh=f80f585401e7b84fe46b93bdedcfb943&oe=6190B2AA",
	"scfcoding",
	false,
	"organization"
);

let theOdinProject = new AccountProfile(
	2,
	"The Odin Project",
	"https://scontent.fzty3-2.fna.fbcdn.net/v/t1.18169-9/17759702_1465860660144710_8362882443305387979_n.png?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=lp8oOpi-hI4AX_CbrS0&_nc_ht=scontent.fzty3-2.fna&oh=cc8070dc9a8c35bcba6665d2fd9866cc&oe=618E7FA5",
	"theodinproject",
	true,
	"organization"
);

const followLibrary = [justinProf, scfCoding, theOdinProject];

justinProf.addSocial("github", "pmentropy", true);
justinProf.addSocial(
	"linkedin",
	"justinduplain",
	true,
	"https://www.linkedin.com/in/justinduplain/"
);
theOdinProject.addSocial("twitter", "theodinproject", "false");
theOdinProject.addSocial(
	"linkedin",
	"the-odin-project",
	"false",
	"https://www.linkedin.com/company/the-odin-project/"
);

//#endregion

//#region Variables - Content //

// Content for resetting the add socials form
// !! Do not use for adding or removing rows, use for form reset only.
const addSocialsContent = `
    <div class="row">
    <div class="col-sm-4">
    <select class="form-select mb-3" aria-label="Social account select menu" id="socialSelect1" required>
        <option value="">Select...</option>
        <option value="facebook">Facebook</option>
        <option value="twitter">Twitter</option>
        <option value="instagram">Instagram</option>
        <option value="linkedin">LinkedIn</option>
        <option value="github">GitHub</option>
    </select>
    </div>
    <div class="col-sm-7">
    <label for="socialHandle1" class="form-label visually-hidden-focusable">Handle</label>
    <div class="input-group">
        <div class="input-group-text">@</div>
        <input type="text" placeholder="profile_handle" class="form-control" id="socialHandle1" pattern="[@a-zA-Z0-9]+" required>
    </div>
    </div>
    <div class="col-sm-1"></div>
    </div>
`;

//#endregion  //variables

/*-------------------*/
/* --- FUNCTIONS --- */
/*-------------------*/

const deleteProfile = (profId) => {
	if (
		confirm(
			"This will delete " + followLibrary[profId].name + " profile. Continue?"
		)
	) {
		console.log("Deleting " + followLibrary[profId].name + " profile...");
		const thisCard = document.querySelector(`[data-profile="${profId}"]`);
		thisCard.remove();
		return delete followLibrary[profId], console.log("deleted");
	}
};

const displayUpdate = (profId) => {
	const profileCard = document.querySelector(`[data-profile="${profId}"]`);
	const profile = followLibrary[profId];
	profileCard.querySelector(".prof-name").innerHTML = profile.name;
	profileCard.querySelector(".acct-handle").innerHTML = profile.acctHandle;
	profileCard.querySelector(".profile-thumb").src = profile.thumb;
	return;
};

const editProfile = (profId, displayUpdate) => {
	console.log("edit: " + followLibrary[profId].name);
	const modalContent = document.querySelector("#editProModal .modal-content");
	const profile = followLibrary[profId];
	//checks for the default profile image, which results in an incomplete URL
	let profImg = "";
	if (profile.thumb === "../img/default_profile.jpg") {
		//leave profImg as blank
	} else {
		//use the complete URL source
		profImg = profile.thumb;
	}
	modalContent.innerHTML = `
        <div class="modal-header p-3">
            <div><h3 class="modal-title text-center">Edit Profile</h3></div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
		<form id="editProForm">
			<div class="modal-body">
				<div class="container-fluid">
				<form>
					<div class="row">
						<div class="col profile-image">
							<h4 class="mb-4 text-muted">Profile Image</h4>
							<img width="50%" class="rounded-circle mx-auto d-block" alt="${profile.name} profile image" src="${profile.thumb}">
							<label for="editImgURL" class="form-label">Profile Image URL</label>
								<input type="url" class="form-control" id="editImgURL" aria-describedby="imgHelp" value="${profImg}">
								<div id="imgHelp" class="form-text">Need somewhere to upload your profile image?<br>Try <a href="https://imgur.com/" target="_blank">imgur</a>.</div>
						</div>
						<div class="col account-details">
							<h4 class="mb-4 text-muted">Account Details</h4>
							<label for="editProfName" class="form-label">Edit Profile Name</label>
								<input type="Text" class="form-control" id="editProfName" aria-describedby="nameHelp" value="${profile.name}">
								<div id="nameHelp" class="form-text mb-3"></div>
							<label for="editProfHandle" class="form-label">Edit Profile Handle</label>
								<div class="input-group">
									<div class="input-group-text">@</div>
									<input type="text" value="${profile.acctHandle}" class="form-control" id="editProfHandle" pattern="[@a-zA-Z0-9]+">
								</div>
								<div id="handleHelp" class="form-text mb-3"></div>
						</div>
						<div class="col">
							<h4 class="mb-4 text-muted">Social Accounts</h4>
							<div id="edit-socials">
							<!-- social accounts go here -->
							</div>
							<div class="row mt-3">
								<p><a href="#" class="" id="add-social-row2">Add More</a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer justify-content-center">
				<div>
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
					<button type="submit" class="btn btn-primary">Save Changes</button>
				</form>
				</div>
			</div>
			<div class="modal-footer justify-content-center">
				<div>
					<a href="#" id="deleteProfile" class="text-center text-danger fs-6 fw-light text-decoration-none">&#128465;&nbsp;&nbsp;Delete this Profile</a>
				</div>
			</div>
		</form>
    `;
	//Adds the list of this profiles social account to the modal
	let socialEditContainer = document.createElement("div");
	profile.socials.forEach(function (element, i) {
		addCounter = i;
		const socialsRow = createSocialsRow(element.network, element.handle);
		socialEditContainer.append(socialsRow);
	});
	modalContent.querySelector("#edit-socials").append(socialEditContainer);

	//Adds another row of social account input
	const addSocialsRowLink2 = document.querySelector("#add-social-row2");
	addSocialsRowLink2.addEventListener("click", (e) => {
		e.preventDefault();
		addCounter++;
		const socialsRow = createSocialsRow();
		socialEditContainer.append(socialsRow);
	});

	//Handles the delete profile link
	const deleteLink = modalContent.querySelector("#deleteProfile");
	deleteLink.addEventListener("click", (e) => {
		editProModal.hide();
		deleteProfile(profId);
	});

	editProModal.show();

	//Handles the input values for the profile
	const editProForm = modalContent.querySelector("#editProForm");
	editProForm.addEventListener("submit", (e) => {
		e.preventDefault();
		//Handles the input values for the profile
		const updatedProfileData = Array.from(
			editProForm.querySelectorAll("input")
		).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
		console.log(updatedProfileData);
		followLibrary[profId].name = updatedProfileData.editProfName;
		followLibrary[profId].acctHandle = updatedProfileData.editProfHandle;
		if (updatedProfileData.editImgURL) {
			followLibrary[profId].thumb = updatedProfileData.editImgURL;
		} else followLibrary[profId].thumb = "../img/default_profile.jpg";

		//Handles the updates to the social accounts
		const updatedSocialData = Array.from(
			editProForm.querySelectorAll(".socialsInput")
		);
		console.log(updatedSocialData);
		//Clears current socials list in the profile and adds the updated value
		profile.socials = [];
		console.log("profile " + profile.name + " socials: " + profile.socials);
		let i = 0;
		while (i < updatedSocialData.length) {
			if (updatedSocialData[i].value) {
				profile.addSocial(
					updatedSocialData[i].value,
					updatedSocialData[i + 1].value,
					false
				);
			}
			i = i + 2;
		}
		console.log("profile " + profile.name + " socials: " + profile.socials);
		displayUpdate(profId);
		editProModal.hide();
	});
};

const viewProfile = (profId) => {
	const modalContent = document.querySelector("#viewProModal .modal-content");
	const profile = followLibrary[profId];
	modalContent.innerHTML = `
        <div class="modal-header p-3">
            <div><h3 class="modal-title text-center">${profile.name}</h3></div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
            <div>
                <img width="50%" class="rounded-circle mx-auto d-block" alt="${profile.name} profile image" src="${profile.thumb}">
                <h4 contenteditable="true">@${profile.acctHandle}</h4> 
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="editProButton">Edit Profile</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
    `;
	//Add the list of social profiles to the modal
	let socialListContainer = document.createElement("div");
	socialListContainer.classList.add("list-group");
	profile.socials.forEach(function (element) {
		let socialListItem = document.createElement("div");
		socialListItem.classList.add("list-group-item");
		socialListItem.innerHTML = `
            ${element.network}: @<a href="${element.url}" target="_blank">${element.handle}</a>
        `;
		socialListContainer.append(socialListItem);
	});
	modalContent.querySelector(".modal-body").append(socialListContainer);

	//adds an event listener to handle the edit profile button
	const editProButton = modalContent.querySelector("#editProButton");
	editProButton.addEventListener("click", (e) => {
		viewProModal.hide();
		editProfile(profId, displayUpdate);
	});

	//display the modal
	viewProModal.show();
};

//adds created AccountProfiles to the followLibrary Array
const storeProfile = (profile) => {
	followLibrary.push(profile);
};

//Manages subscription state in the record
function updateSub(index, value) {
	followLibrary[index].subscribed = value;
	console.log(
		"Subscribed to " +
			followLibrary[index].name +
			": " +
			followLibrary[index].subscribed
	);
}

//maps a profile array for display in the page
function displayProfiles(profileArray) {
	var profileMap = profileArray.map((profile) => {
		let profileCard = document.createElement("div");
		profileCard.classList.add("col", "order-2");
		profileCard.setAttribute("data-profile", profile.id);
		profileCard.innerHTML = `
            <div class="card shadow-sm">
                <img class="card-img-top profile-thumb" width="100%" alt="${profile.name} profile thumbnail" src="${profile.thumb}" />
                <div class="card-body">
                    <h3 class="card-text text-center m-3 prof-name">${profile.name}</h3>
                    <h4 class="card-text text-center m-3 text-muted acct-handle">&#64;${profile.acctHandle}</h4>
                    <p class="card-text text-center m-3 text-muted profile-type">${profile.type}</p>
                    <div class="d-flex flex-column justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary view-profile" 
                            data-profile="${profile.id}">View</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary edit-profile" 
                            data-profile="${profile.id}">Edit</button>
                        </div>
                        <!-- suscribe switch -->
                        <form class="subscribe-form">
                            <div class="form-check form-switch d-flex flex-column align-items-center justify-content-center mt-3 p-0">
                                <label class="form-check-label text-muted" for="subscribeSwitch">Subscribe</label>
                                <input class="form-check-input m-2" type="checkbox" id="sub-form-${profile.id}">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
		//subscribed checkbox functionality
		const subCheck = profileCard.querySelector(`#sub-form-${profile.id}`);
		//Makes the switch indicator reflect the profile value
		if (profile.subscribed) {
			subCheck.checked = true;
		}
		//Listener that updates the profile object when the switch it toggled
		subCheck.addEventListener("change", function () {
			this.checked ? updateSub(profile.id, true) : updateSub(profile.id, false);
		});

		//View and Edit Profile button functionality
		//View profile button
		const viewButton = profileCard.querySelector("button.view-profile");
		const profId = viewButton.dataset.profile;
		viewButton.addEventListener("click", (e) => {
			viewProfile(profId);
		});

		//Edit profile button
		const editButton = profileCard.querySelector("button.edit-profile");
		editButton.addEventListener("click", (e) => {
			editProfile(profId, displayUpdate);
		});

		//add the created card to the start of the container
		profileContainer.prepend(profileCard);
	}); //end profile map
}

//creates an input row for adding or editing a social media account handle
const createSocialsRow = (platform, handle) => {
	let currPlatform = null;
	let currHandle = null;
	if (platform) {
		currPlatform = platform;
	}
	if (handle) {
		currHandle = handle;
	}
	var socialsRow = document.createElement("div");
	socialsRow.classList = "row g-2";
	socialsRow.innerHTML = `
        <div class="col-sm-4">
            <label for="socialSelect${addCounter}" class="form-label visually-hidden-focusable">Platform</label>
            <select class="form-select mb-3 socialPlatform socialsInput" aria-label="Social account select menu" id="socialSelect${addCounter}" required>
                <option value="">Select...</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="github">GitHub</option>
            </select>
        </div>
        <div class="col-sm-7">
            <label for="socialHandle${addCounter}" class="form-label visually-hidden-focusable">Handle</label>
            <div class="input-group">
                <div class="input-group-text">@</div>
                <input type="text" placeholder="profile_handle" class="form-control socialHandle socialsInput" id="socialHandle${addCounter}" pattern="[@a-zA-Z0-9]+" required>
            </div>
        </div>
        <div class="col-sm-1 rmSocRow cursor-pointer">
            X
        </div>
    `;
	if (platform) {
		socialsRow.querySelector(".socialPlatform").value = platform;
	}
	if (handle) {
		socialsRow.querySelector(".socialHandle").value = handle;
	}
	let rmSocRow = socialsRow.querySelector(".rmSocRow");
	rmSocRow.addEventListener("click", (e) => {
		socialsRow.remove();
	});
	return socialsRow;
};

/*----------------------*/
/*--- EVENT LISTENERS --*/
/*----------------------*/

//Add a new profile from the form in the modal
addProfileForm.addEventListener("submit", (e) => {
	e.preventDefault();
	console.log("submitting new profile..");
	//Get the input values and place them in an array
	const newProfileData = Array.from(
		document.querySelectorAll("#add-profile input")
	).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
	const profileType = document.querySelector("#profileType").value;
	const followCheck = document.querySelector("#followCheck").checked;

	//Creates a new AccountProfile Object from the input
	const newProf = new AccountProfile(
		followLibrary.length,
		newProfileData.profileName,
		newProfileData.profileImg,
		newProfileData.profileHandle,
		false,
		profileType
	);
	//check if "Follow this profile" is selected
	if (followCheck) {
		newProf.subscribed = true;
	}
	//check for a blank img url
	if (!newProf.thumb) {
		newProf.thumb = "../img/default_profile.jpg";
	}

	//adds the new account to the array
	storeProfile(newProf);

	//sends the item to the mapping function to add it to the page
	displayProfiles(followLibrary.slice(-1));

	//resets the form
	addProfileForm.reset();
	//closes the modal
	const addModal = document.querySelector("#addProfileModal");
	const modal = bootstrap.Modal.getInstance(addModal);
	modal.hide();

	console.log(newProf.name + " profile added.");

	//opens the dialog for adding socail accounts to the profile
	customNameSpan.innerHTML = `&#10003; ${newProf.name} profile added.`;
	addSocialsModal.show();
});

// Optional Add social profile(s) modal appears after after adding an account
addSocialsForm.addEventListener("submit", (e) => {
	e.preventDefault();
	console.log("submitting socials...");
	let currProfile = followLibrary.at(-1);
	const socialsFormElem = Array.from(addSocialsForm.elements);
	//remove the cancel and submit buttons
	socialsFormElem.splice(-2, 2);
	//steps through the submission value pairs (platform and handle) and adds them to the profile object
	let i = 0;
	while (i < socialsFormElem.length) {
		if (socialsFormElem[i].value) {
			currProfile.addSocial(
				socialsFormElem[i].value,
				socialsFormElem[i + 1].value,
				false
			);
		}
		i = i + 2;
	}
	addSocialsModal.hide();
	addSocialsForm.reset();
	addSocialsSection.innerHTML = addSocialsContent;
	setTimeout(() => {
		console.log(currProfile.name + " profile and social accounts added.");
	}, 500);
	return currProfile;
});

//adds another row of social account input on click (for the add new profile window)
addSocialsRowLink.addEventListener("click", (e) => {
	e.preventDefault();
	addCounter++;
	addSocialsSection.append(createSocialsRow());
});

/*----------------------*/
/*-- PAGE INITIALIZERS -*/
/*----------------------*/

displayProfiles(followLibrary);
