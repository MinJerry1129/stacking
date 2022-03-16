import { ChainId, Token} from "@uniswap/sdk";
import { BigNumber } from "@0x/utils";

export const BTC = {
	symbol: "BTC",
	name: "Bitcoin",
	logoURI: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
	decimals: 18,
	chainId: 1,
	address: "0x0000000000000000000000000000000000000001",
};


export const Infura_API =  process.env.INFURA_URL || "https://mainnet.infura.io/v3/14578050d14c492fb3e1669daef59b62";
export const Polygon_rpc = process.env.POLYGON_URL || "https://polygon-rpc.com";

export const CHANGE_NOW_FLOW = process.env.REACT_APP_CHANGE_NOW_FLOW || 'standard';

export const SIDE_SHIFT_TYPE = process.env.REACT_APP_SIDE_SHIFT_TYPE || 'variable';

export const ZERO = new BigNumber(0);

export const supportedDEXes = {
	paraswap: [
		"MultiPath",
		"ParaSwapPool",
		"Swerve",
		"Balancer",
		"SushiSwap",
		"UniswapV2",
		"Uniswap",
		"Oasis",
		"Aave",
		"Weth",
		"Bancor",
		"Kyber",
		"Compound",
		"Zerox",
		"DefiSwap",
		"LINKSWAP",
		"ShibaSwap",
		"ParaSwapPool3",
		"ParaSwapPool7",
		"ParaSwapPool10",
		"UniswapV3",
		"OneInchLP",
		"SakeSwap",
		"BalancerV2",
		"KyberDMM"
	],
	dexag: ["synthetix", "ag", "curvefi", "zero_x"],
};

export const DEXesImages = {
	BalancerV2: "BALANCER.svg",
	UniswapV3:"UNISWAP.svg",
	ParaSwapPool3: "PARASWAP.jpg",
	ParaSwapPool7: "PARASWAP.jpg",
	ParaSwapPool10: "PARASWAP.jpg",
	Weth: "RADARRELAY.jpg",
	Uniswap: "UNISWAP.svg",
	UniswapV2: "UNISWAP.svg",
	Compound: "COMPOUND.png",
	CHAI: "CHAI.png",
	Oasis: "OASIS.svg",
	Kyber: "KYBER.svg",
	Aave: "AAVE.png",
	Bancor: "BANCOR.svg",
	zero_x: "ZEROEX.png",
	Zerox: "ZEROEX.png",
	MultiPath: "PARASWAP.jpg",
	ParaSwapPool: "PARASWAP.jpg",
	Swerve: "SWERVE.png",
	Balancer: "BALANCER.svg",
	SushiSwap: "SUSHISWAP.svg",
	synthetix: "SYNTHETIX.jpg",
	ag: "XBLASTER.png",
	curvefi: "CURVEFI.png",
	godex: "GODEX.png",
	oneInch: "ONEINCH.svg",
	coinSwitch: "coinSwitch.png",
	simpleSwap: "simpleswap.png",
	stealthex: "Stealthex.png",
	DefiSwap: "defiSwap.png",
	LINKSWAP: "linkSwap.png",
	changeNow: "CHANGE_NOW.png",
	sideShift: "SIDESHIFT.png",
	ShibaSwap: "shiba.png",
	OneInchLP: "ONEINCH.svg",
	SakeSwap: "sakeswap.png",
	KyberDMM: "kyber1.png"

};

export const networks_dict = {
	1 : 'eth'
}


const UNI_ADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
export const UNI: { [chainId in ChainId]: Token } = {
	[ChainId.MAINNET]: new Token(ChainId.MAINNET, UNI_ADDRESS, 18, "UNI", "Uniswap"),
	[ChainId.RINKEBY]: new Token(ChainId.RINKEBY, UNI_ADDRESS, 18, "UNI", "Uniswap"),
	[ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, UNI_ADDRESS, 18, "UNI", "Uniswap"),
	[ChainId.GÖRLI]: new Token(ChainId.GÖRLI, UNI_ADDRESS, 18, "UNI", "Uniswap"),
	[ChainId.KOVAN]: new Token(ChainId.KOVAN, UNI_ADDRESS, 18, "UNI", "Uniswap"),
};

export const DEFAULT_DECIMALS = 18;

export const SIMPLE_SWAP_FIXED = process.env.REACT_APP_SIMPLESWAP_FIXED_RATE === "true" || false;
export const PROXY_URL = process.env.REACT_APP_PROXY_URL || "http://localhost:3001";

export const NFT_REFERRER_ACCOUNT = process.env.REACT_APP_NFT_REFERRER_ACCOUNT
	? process.env.REACT_APP_NFT_REFERRER_ACCOUNT
	: process.env.REACT_APP_REFERRER_ACCOUNT;
export const ONE_INCH_REFERRER_ACCOUNT = process.env.REACT_APP_1INCH_REFERRER_ACCOUNT
	? process.env.REACT_APP_1INCH_REFERRER_ACCOUNT
	: process.env.REACT_APP_REFERRER_ACCOUNT;
export const ONE_INCH_FEE_PERCENTAGE = process.env.REACT_APP_1INCH_REFERRER_FEE_PERCENTAGE
	? process.env.REACT_APP_1INCH_REFERRER_FEE_PERCENTAGE
	: "0";
export const PARASWAP_REFERRER_ACCOUNT = process.env.REACT_APP_PARASWAP_REFERRER
	? process.env.REACT_APP_PARASWAP_REFERRER
	: process.env.REACT_APP_REFERRER_ACCOUNT;
export const BITREFILL_REF_TOKEN = process.env.REACT_APP_BITREFILL_REF_TOKEN
	? process.env.REACT_APP_BITREFILL_REF_TOKEN
	: process.env.REACT_APP_REFERRER_ACCOUNT;

export const eth_price_url = process.env.ETH_PRICE_URL || "https://api.etherscan.io/api";
export const ethscan_apikey = process.env.ETHERSCAN_APIKEY || "RR34X3FQPI37TSKY3PDHUGFHYMXG6UWG2Y";
export const eth_gas_station_url = process.env.ETH_GAS_STATION_URL || "https://ethgasstation.info/api";
export const gas_station_api_key = process.env.GAS_STATION_API_KEY || "1ecdbc34bc88791dc886a1c055d8f975a1aeef84c8d6cc6c3dc4fd89780f";
export const bridge_url = process.env.BRIDGE_URL || "https://bridge.walletconnect.org";

export const farm_backend_url = 'https://farmbackendapi0221.herokuapp.com/getFarmsData';
export const _1inch_url = "https://app.1inch.io/#/1/dao/pools";
export const sushi_url = "https://app.sushi.com/add";
export const dino_url = "https://trade.dinoswap.exchange";
export const quick_url = "https://quickswap.exchange/#/add";
export const metamask_download_url = 'https://metamask.io/download/';
export const coingetco_url = "https://www.coingecko.com/en/coins/";

export const chainport_url = 'https://api.chainport.io/token/list';

export const httpLink1_uri = process.env.HTTPLINK1_URI || 'https://api.thegraph.com/subgraphs/name/gvladika/simplefi-sushiswap-farms';
export const httpLink2_uri = process.env.HTTPLINK2_URI || 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange';
export const wsLink1_uri = process.env.WSLINK1_URI || 'wss://api.thegraph.com/subgraphs/name/gvladika/simplefi-sushiswap-farms';
export const wsLink2_uri = process.env.WSLINK2_URI || 'wss://api.thegraph.com/subgraphs/name/sushiswap/exchange';

export const sushi_farm_address = process.env.SUSHI_FARM_ADDRESS || "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd";
export const dino_farm_address = process.env.DINO_FARM_ADDRESS || "0x1948abC5400Aa1d72223882958Da3bec643fb4E5";

export const debank = "https://openapi.debank.com/v1/user";

export const approve_ico = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9Im1hc2swIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPgo8cGF0aCBkPSJNMjMuNSAxMkMyMy41IDE4LjM1MTMgMTguMzUxMyAyMy41IDEyIDIzLjVDNS42NDg3MyAyMy41IDAuNSAxOC4zNTEzIDAuNSAxMkMwLjUgNS42NDg3MyA1LjY0ODczIDAuNSAxMiAwLjVDMTguMzUxMyAwLjUgMjMuNSA1LjY0ODczIDIzLjUgMTJaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJ3aGl0ZSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazApIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAyNEMxOC42Mjc0IDI0IDI0IDE4LjYyNzQgMjQgMTJDMjQgNS4zNzI1OCAxOC42Mjc0IDAgMTIgMEM1LjM3MjU4IDAgMCA1LjM3MjU4IDAgMTJDMCAxOC42Mjc0IDUuMzcyNTggMjQgMTIgMjRaIiBmaWxsPSIjRjNGM0Y0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUuMTI1IDkuMzc1SDE1Ljc1QzE2LjQzNzUgOS4zNzUgMTcgOS45Mzc1IDE3IDEwLjYyNVYxNi44NzVDMTcgMTcuNTYyNSAxNi40Mzc1IDE4LjEyNSAxNS43NSAxOC4xMjVIOC4yNUM3LjU2MjUgMTguMTI1IDcgMTcuNTYyNSA3IDE2Ljg3NVYxMC42MjVDNyA5LjkzNzUgNy41NjI1IDkuMzc1IDguMjUgOS4zNzVIMTMuOTM3NVY4LjEyNUMxMy45Mzc1IDcuMDU2MjUgMTMuMDY4NyA2LjE4NzUgMTIgNi4xODc1QzExLjI0NDMgNi4xODc1IDEwLjU4ODYgNi42MjE4OCAxMC4yNjkzIDcuMjU0MkMxMC4xMzc1IDcuNTE1MTkgOS44OTQzMSA3LjcyNjM4IDkuNjAxOTMgNy43MjYzOEM5LjIyOTY0IDcuNzI2MzggOC45Mzc4MyA3LjM5NTQ2IDkuMDY2NDggNy4wNDYxQzkuNTA2MTEgNS44NTIyMiAxMC42NTQxIDUgMTIgNUMxMy43MjUgNSAxNS4xMjUgNi40IDE1LjEyNSA4LjEyNVY5LjM3NVpNMTIgMTVDMTIuNjg3NSAxNSAxMy4yNSAxNC40Mzc1IDEzLjI1IDEzLjc1QzEzLjI1IDEzLjA2MjUgMTIuNjg3NSAxMi41IDEyIDEyLjVDMTEuMzEyNSAxMi41IDEwLjc1IDEzLjA2MjUgMTAuNzUgMTMuNzVDMTAuNzUgMTQuNDM3NSAxMS4zMTI1IDE1IDEyIDE1Wk04LjI1IDE2Ljg3NUgxNS43NVYxMC42MjVIOC4yNVYxNi44NzVaIiBmaWxsPSIjMTUxNTFGIi8+CjwvZz4KPC9zdmc+Cg=="
export const execute_ico = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9Im1hc2swIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPgo8cGF0aCBkPSJNMjMuNSAxMkMyMy41IDE4LjM1MTMgMTguMzUxMyAyMy41IDEyIDIzLjVDNS42NDg3MyAyMy41IDAuNSAxOC4zNTEzIDAuNSAxMkMwLjUgNS42NDg3MyA1LjY0ODczIDAuNSAxMiAwLjVDMTguMzUxMyAwLjUgMjMuNSA1LjY0ODczIDIzLjUgMTJaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJ3aGl0ZSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazApIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAyNEMxOC42Mjc0IDI0IDI0IDE4LjYyNzQgMjQgMTJDMjQgNS4zNzI1OCAxOC42Mjc0IDAgMTIgMEM1LjM3MjU4IDAgMCA1LjM3MjU4IDAgMTJDMCAxOC42Mjc0IDUuMzcyNTggMjQgMTIgMjRaIiBmaWxsPSIjRjNGM0Y0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOC4wMDEzIDUuMzMzOThDNy4yNjc5NyA1LjMzMzk4IDYuNjc0NjQgNS45MzM5OCA2LjY3NDY0IDYuNjY3MzJMNi42Njc5NyAxNy4zMzRDNi42Njc5NyAxOC4wNjczIDcuMjYxMyAxOC42NjczIDcuOTk0NjQgMTguNjY3M0gxNi4wMDEzQzE2LjczNDYgMTguNjY3MyAxNy4zMzQ2IDE4LjA2NzMgMTcuMzM0NiAxNy4zMzRWOS4zMzM5OEwxMy4zMzQ2IDUuMzMzOThIOC4wMDEzWk05LjAwMzEyIDYuNjY3MTlDOC40NTMxMiA2LjY2NzE5IDguMDA4MTIgNy4xNDcxOSA4LjAwODEyIDcuNzMzODVMOC4wMDMxMiAxNi4yNjcyQzguMDAzMTIgMTYuODUzOSA4LjQ0ODEyIDE3LjMzMzkgOC45OTgxMyAxNy4zMzM5SDE1LjAwMzFDMTUuNTUzMSAxNy4zMzM5IDE2LjAwMzEgMTYuODUzOSAxNi4wMDMxIDE2LjI2NzJWOS44NjcxOUwxMy4wMDMxIDYuNjY3MTlIOS4wMDMxMlpNMTIuMDAzMSAxMC42Njc3VjcuMzM0MzdMMTUuMzM2NSAxMC42Njc3SDEyLjAwMzFaIiBmaWxsPSIjMkMyQzM1Ii8+CjwvZz4KPC9zdmc+Cg==";
export const receive_ico = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9Im1hc2swIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPgo8cGF0aCBkPSJNMjMuNSAxMkMyMy41IDE4LjM1MTMgMTguMzUxMyAyMy41IDEyIDIzLjVDNS42NDg3MyAyMy41IDAuNSAxOC4zNTEzIDAuNSAxMkMwLjUgNS42NDg3MyA1LjY0ODczIDAuNSAxMiAwLjVDMTguMzUxMyAwLjUgMjMuNSA1LjY0ODczIDIzLjUgMTJaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJ3aGl0ZSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazApIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAyNEMxOC42Mjc0IDI0IDI0IDE4LjYyNzQgMjQgMTJDMjQgNS4zNzI1OCAxOC42Mjc0IDAgMTIgMEM1LjM3MjU4IDAgMCA1LjM3MjU4IDAgMTJDMCAxOC42Mjc0IDUuMzcyNTggMjQgMTIgMjRaIiBmaWxsPSIjRjNGM0Y0Ii8+CjxwYXRoIGQ9Ik0xMS4zNzc5IDcuNzU1NDRWMTQuNzM2N0w4LjMyNzg4IDExLjY4NjdDOC4wODQxMyAxMS40NDI5IDcuNjg0MTMgMTEuNDQyOSA3LjQ0MDM4IDExLjY4NjdDNy4xOTY2MyAxMS45MzA0IDcuMTk2NjMgMTIuMzI0MiA3LjQ0MDM4IDEyLjU2NzlMMTEuNTU5MSAxNi42ODY3QzExLjgwMjkgMTYuOTMwNCAxMi4xOTY2IDE2LjkzMDQgMTIuNDQwNCAxNi42ODY3TDE2LjU1OTEgMTIuNTY3OUMxNi44MDI5IDEyLjMyNDIgMTYuODAyOSAxMS45MzA0IDE2LjU1OTEgMTEuNjg2N0MxNi40NDI0IDExLjU2OTcgMTYuMjgzOCAxMS41MDM5IDE2LjExODUgMTEuNTAzOUMxNS45NTMyIDExLjUwMzkgMTUuNzk0NyAxMS41Njk3IDE1LjY3NzkgMTEuNjg2N0wxMi42Mjc5IDE0LjczNjdWNy43NTU0NEMxMi42Mjc5IDcuNDExNjkgMTIuMzQ2NiA3LjEzMDQ0IDEyLjAwMjkgNy4xMzA0NEMxMS42NTkxIDcuMTMwNDQgMTEuMzc3OSA3LjQxMTY5IDExLjM3NzkgNy43NTU0NFoiIGZpbGw9IiMwMEJFMjIiLz4KPC9nPgo8L3N2Zz4K";
export const send_ico = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9Im1hc2swIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPgo8cGF0aCBkPSJNMjMuNSAxMkMyMy41IDE4LjM1MTMgMTguMzUxMyAyMy41IDEyIDIzLjVDNS42NDg3MyAyMy41IDAuNSAxOC4zNTEzIDAuNSAxMkMwLjUgNS42NDg3MyA1LjY0ODczIDAuNSAxMiAwLjVDMTguMzUxMyAwLjUgMjMuNSA1LjY0ODczIDIzLjUgMTJaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJ3aGl0ZSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazApIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAyNEMxOC42Mjc0IDI0IDI0IDE4LjYyNzQgMjQgMTJDMjQgNS4zNzI1OCAxOC42Mjc0IDAgMTIgMEM1LjM3MjU4IDAgMCA1LjM3MjU4IDAgMTJDMCAxOC42Mjc0IDUuMzcyNTggMjQgMTIgMjRaIiBmaWxsPSIjRjNGM0Y0Ii8+CjxwYXRoIGQ9Ik0xMi42MjIxIDE2LjI0NDZMMTIuNjIyMSA5LjI2MzMxTDE1LjY3MjEgMTIuMzEzM0MxNS45MTU5IDEyLjU1NzEgMTYuMzE1OSAxMi41NTcxIDE2LjU1OTYgMTIuMzEzM0MxNi44MDM0IDEyLjA2OTYgMTYuODAzNCAxMS42NzU4IDE2LjU1OTYgMTEuNDMyMUwxMi40NDA5IDcuMzEzMzFDMTIuMTk3MSA3LjA2OTU2IDExLjgwMzQgNy4wNjk1NiAxMS41NTk2IDcuMzEzMzFMNy40NDA4NyAxMS40MzIxQzcuMTk3MTIgMTEuNjc1OCA3LjE5NzEyIDEyLjA2OTYgNy40NDA4NyAxMi4zMTMzQzcuNTU3NjQgMTIuNDMwMyA3LjcxNjE3IDEyLjQ5NjEgNy44ODE0OSAxMi40OTYxQzguMDQ2ODIgMTIuNDk2MSA4LjIwNTM1IDEyLjQzMDMgOC4zMjIxMiAxMi4zMTMzTDExLjM3MjEgOS4yNjMzMUwxMS4zNzIxIDE2LjI0NDZDMTEuMzcyMSAxNi41ODgzIDExLjY1MzQgMTYuODY5NiAxMS45OTcxIDE2Ljg2OTZDMTIuMzQwOSAxNi44Njk2IDEyLjYyMjEgMTYuNTg4MyAxMi42MjIxIDE2LjI0NDZaIiBmaWxsPSIjMTUxNTFGIi8+CjwvZz4KPC9zdmc+Cg==";
export const trade_ico = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9Im1hc2swIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPgo8cGF0aCBkPSJNMjMuNSAxMkMyMy41IDE4LjM1MTMgMTguMzUxMyAyMy41IDEyIDIzLjVDNS42NDg3MyAyMy41IDAuNSAxOC4zNTEzIDAuNSAxMkMwLjUgNS42NDg3MyA1LjY0ODczIDAuNSAxMiAwLjVDMTguMzUxMyAwLjUgMjMuNSA1LjY0ODczIDIzLjUgMTJaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJ3aGl0ZSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazApIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAyNEMxOC42Mjc0IDI0IDI0IDE4LjYyNzQgMjQgMTJDMjQgNS4zNzI1OCAxOC42Mjc0IDAgMTIgMEM1LjM3MjU4IDAgMCA1LjM3MjU4IDAgMTJDMCAxOC42Mjc0IDUuMzcyNTggMjQgMTIgMjRaIiBmaWxsPSIjRjNGM0Y0Ii8+CjxwYXRoIGQ9Ik03LjY0MTc1IDExQzE2LjIxMDIgMTEgMTQuODEgMTAuOTk5OSAxNi44MTIzIDEwLjk5OThDMTcuMDYyNiAxMC43NDc5IDE3LjA2MjYgMTAuMTUzOSAxNi44MTIzIDkuOTAxOTlMMTQuMjQ3MyA3LjE4ODkyQzEzLjk5NyA2LjkzNzAzIDEzLjU5MjcgNi45MzcwMyAxMy4zNDI0IDcuMTg4OTJDMTMuMjIyMyA3LjMwOTYgMTMuMTU0NyA3LjQ3MzQzIDEzLjE1NDcgNy42NDQyN0MxMy4xNTQ3IDcuODE1MTIgMTMuMjIyMyA3Ljk3ODk1IDEzLjM0MjQgOC4wOTk2M0wxNC44MSA5LjcwODIyTDcuNjQxNzUgOS43MDgyMkM3LjI4ODc5IDkuNzA4MjIgNyA5Ljk5ODg3IDcgMTAuMzU0MUM3IDEwLjcwOTMgNy4yODg3OSAxMSA3LjY0MTc1IDExWiIgZmlsbD0iIzE1MTUxRiIvPgo8cGF0aCBkPSJNMTYuMzU4MyAxM0M3Ljc4OTgzIDEzIDkuMTg5OTYgMTMuMDAwMSA3LjE4NzcxIDEzLjAwMDJDNi45Mzc0MyAxMy4yNTIxIDYuOTM3NDMgMTMuODQ2MSA3LjE4NzcxIDE0LjA5OEw5Ljc1MjcgMTYuODExMUMxMC4wMDMgMTcuMDYzIDEwLjQwNzMgMTcuMDYzIDEwLjY1NzYgMTYuODExMUMxMC43Nzc3IDE2LjY5MDQgMTAuODQ1MyAxNi41MjY2IDEwLjg0NTMgMTYuMzU1N0MxMC44NDUzIDE2LjE4NDkgMTAuNzc3NyAxNi4wMjEgMTAuNjU3NiAxNS45MDA0TDkuMTg5OTYgMTQuMjkxOEwxNi4zNTgzIDE0LjI5MThDMTYuNzExMiAxNC4yOTE4IDE3IDE0LjAwMTEgMTcgMTMuNjQ1OUMxNyAxMy4yOTA3IDE2LjcxMTIgMTMgMTYuMzU4MyAxM1oiIGZpbGw9IiMxNTE1MUYiLz4KPC9nPgo8L3N2Zz4K";
export const avatar_ico = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAA5JJREFUeF7t3bFRHEEURdHeIHDIQ7gEQADYBCELB0eWbGyiwMKSK7KQoTQgBuZ01WeqrvzXO3vn7e2vZXbm8u/57WOd+N/Pp8fRo//99Gv09fXFLxXAEFYA48fpDGAIM4DxWxkAAWo8AxjBDGD8MgDy43gGMIQZwPhlAOTH8QxgCDOA8csAyI/jGcAQZgDjlwGQH8czgCHMAMYvAyA/jmcAQ5gBjF8GQH4cv3m/5jVkgb8//kt8PHt6A1QA61AFMH4rAyBAjWcAI5gBjF8GQH4czwCGMAMYvwyA/DieAQxhBjB+GQD5cTwDGMIMYPwyAPLjeAYwhBnA+GUA5MfxDGAIM4DxywDIj+MZwBBe7q9uRu8PoD+uPPsVQdPHXwHsA8RXBFUAvMPGNMCzGywDZIBmAOlABhB6a51+D60AFYAITM8wzQB0+s5vsApQARoCpQPNAEKvIXA1A/RFEH6ELN4MYPxO/9/YClABGgKlAw2BQq8hcH4InL5d/PQUjP3luBpED2D8krAKMPvAiQqgHyHMZ4DhR77g+eN4BagAXCJZoC1A6G3IZoAMsKFGx5fIAMfZbUlmgAywpUhHF8kAR8ltymWADLCpSseWyQDHuG1LZYAMsK1MRxbKAEeobcxkgAywsU5fXyoDfJ3Z1sS4AfT+APoG+nOw/TlY+fE1gRXAhDDNrwLY+eN0BWgIpBK1BRC++XAGyADUwgxA+ObDGSADUAszAOGbD2eADEAtzACEbz6cATIAtTADEL75cAbIANTCDED45sMZIANQC9kAen8APQD9BBC9bxCe5sdXBE2/gW9wDukQpvlVADp9Hq4AeJ9APwWzK1SACkAN1BmqLYDwezgDZABqUQYgfPPhDJABqIUZgPDNhzNABqAWZgDCNx/OABmAWpgBCN98OANkAGphBiB88+FxA3R/gNkS6CdYC9TPw2fP//hDpypABbCHRk0rbPj88ctP88sAfAptgQrQVcHUoIZAwjcfzgAZgFqYAQjffDgDZABqYQYgfPPhDJABqIUZgPDNhzNABqAWZgDCNx/OABmAWsgG0PsD0NGvtfQN/Ll70UOg/O3rA+XVAPTiay3+baAeQAWwB0Yo/wqABDMAAswAGYAq1AxA+JoBDN9abQFIsC2gLYAq1BZA+NoCDF9bgPLri6Dhn8b1PQBWuCEQATYENgRShRoCCV9DoOFrCFR+DYENgY9UorYAwrc+Aa/Dvi60wEfQAAAAAElFTkSuQmCC";