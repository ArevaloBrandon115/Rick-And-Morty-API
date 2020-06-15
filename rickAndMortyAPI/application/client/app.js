// hirstoty component and template
const historyComponent = {
	template: ` <div>
                  <div class="col" v-for="item in historyTracker">
                    <small @click="getByID(item.id)">
                        {{ item.name }} | {{ item.date }}
                    </small>
                    <hr class="bg-white"/>
                  </div>
              </div>`,
	methods: {
		getByID: async function (id) {
			const response = await axios.post(`http://localhost:8888/api/getByID`, {
				id: id,
			});
			episodes.showbar = false;
			episodes.showlist = false;
			episodes.showResult = true;
			episodes.idSearch = response.data;
		},
	},
	props: ["historyTracker"],
};

const episodes = new Vue({
	el: "#episodes",
	// data we need for webpage
	data: {
		appName: "Rick and Morty App",
		nameInput: "",
		defaultPicture: "https://images6.alphacoders.com/909/thumb-1920-909641.png",
		episodeNames: {},
		idSearch: {},
		historyTracker: [],
		showbar: true,
		showlist: true,
		showResult: false,
	},
	// this get the total number of results seached by name
	computed: {
		listSize: function () {
			if (this.episodeNames && this.episodeNames.results) {
				return this.episodeNames.results.length;
			} else {
				return 0;
			}
		},
	},
	// searchName,getByID,searchAgain,episodeHistory methods
	methods: {
		//returns the list of results seach by name
		searchName: async function () {
			const response = await axios.post(`http://localhost:8888/api/search`, {
				nameToSearch: this.nameInput,
			});
			this.episodeNames = response.data;
			if (this.listSize != 0) {
				this.showbar = false;
			}
		},
		//fetch the result by id
		getByID: async function (id) {
			const response = await axios.post(`http://localhost:8888/api/getByID`, {
				id: id,
			});
			this.idSearch = response.data;
			this.showlist = false;
			this.showResult = true;
			this.episodeHistory();
		},
		//resets all data history to do new search
		searchAgain: function () {
			this.nameInput = "";
			this.episodeNames = {};
			this.idSearch = {};
			this.showbar = true;
			this.showlist = true;
			this.showResult = false;
		},
		//adds to history list with no duplicates
		episodeHistory: function () {
			const now = new Date().toLocaleDateString("en-US");

			let noDouble = true;
			this.historyTracker.forEach((item) => {
				if (item.id === this.idSearch.id) {
					noDouble = false;
				}
			});
			if (noDouble) {
				this.historyTracker.push({
					id: this.idSearch.id,
					name: this.idSearch.name,
					date: now,
				});
			}
		},
	},
	// history component
	components: {
		"history-component": historyComponent,
	},
});
