import axios from "axios";

export default class ParaswapManualApi {
	constructor() {
		this.instance = axios.create({
			baseURL: "https://apiv5.paraswap.io/",
		});
	}

	get(type, payload = {}) {
		switch (type) {
			case "quote": {
				return this.getQuote(payload);
			}
			default:
			
		}
	}

	
	getQuote(payload) {
		return this.instance.get(`prices`, {
			params: payload,
		});
	}

	
}
