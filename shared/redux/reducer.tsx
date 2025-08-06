
const initialState = {
	lang: "en",
	dir: "ltr",
	dataThemeMode: "light",
	dataMenuStyles: "light",
	dataNavLayout: "vertical",
	dataHeaderStyles: "light",
	dataVerticalStyle: "overlay",
	toggled: "",
	dataNavStyle: "",
	horStyle: "",
	dataPageStyle: "regular",
	dataWidth: "fullwidth",
	dataMenuPosition: "fixed",
	dataHeaderPosition: "fixed",
	iconOverlay: "",
	colorPrimaryRgb: "",
	colorPrimary: "",
	bodyBg1: "",
	bodyBg2: "",
	darkBg: "",
	inputBorder: "",
	bgImg: "",
	iconText: "",
	body: {
		class: ""
	},
	ecommercedata: [
		{
			id: "1",
			preview: '../../../../assets/images/ecommerce/products/1.jpg',
			title: 'Women Party Wear Dress', rating: '4.2',
			description: 'laborum et dolorum fuga',
			newpr: '$229',
			oldpr: '$1,799',
			off: '72% off',
			Offerprice: 'Offer Price $229',
			color: "secondary-transparent"
		},
		{
			id: "2",
			preview: '../../../../assets/images/ecommerce/products/2.jpg',
			title: 'Running Shoes for men',
			rating: '4.0',
			description: 'laborum et dolorum fuga',
			newpr: '$599',
			oldpr: '$2,499',
			off: '75% off',
			Offerprice: 'Offer Price $599',
			color: "secondary-transparent"
		},
		{
			id: "3",
			preview: '../../../../assets/images/ecommerce/products/3.jpg',
			title: 'Flower Pot for Home Decor',
			rating: '4.5',
			description: 'laborum et dolorum fuga',
			newpr: '$1,199',
			oldpr: '$3,299',
			off: '62% off',
			Offerprice: 'Offer Price $1,199',
			color: "secondary-transparent"
		},
		{
			id: "4",
			preview: '../../../../assets/images/ecommerce/products/4.jpg',
			title: 'Men shirt for party wear',
			rating: '4.2',
			description: 'laborum et dolorum fuga',
			newpr: '$349',
			oldpr: '$1,299',
			off: '60% off',
			Offerprice: 'Offer Price $349',
			color: "secondary-transparent"
		},
		{
			id: "5",
			preview: '../../../../assets/images/ecommerce/products/5.jpg',
			title: 'Black Digital Camera',
			rating: '4.5',
			description: 'laborum et dolorum fuga',
			newpr: '$1,899',
			oldpr: '$3,799',
			off: '50% off',
			Offerprice: 'Offer Price $1,899',
			color: "secondary-transparent"
		},
		{
			id: "6",
			preview: '../../../../assets/images/ecommerce/products/6.jpg',
			title: 'Light pink nail polish',
			rating: '4.1', description: 'laborum et dolorum fuga',
			newpr: '$1,499',
			oldpr: '$2,499',
			off: '38% off',
			Offerprice: 'Offer Price $1,499',
			color: "secondary-transparent"
		},
		{
			id: "7",
			preview: '../../../../assets/images/ecommerce/products/7.jpg',
			title: 'Stylish Rockerz 255 Ear Pods',
			rating: '4.4',
			description: 'laborum et dolorum fuga',
			newpr: '$299',
			oldpr: '$399',
			off: '35% off',
			Offerprice: 'Offer Price $299',
			color: "secondary-transparent"
		},
		{
			id: "8",
			preview: '../../../../assets/images/ecommerce/products/8.jpg',
			title: 'Candy Pure Rose Water',
			rating: '3.8',
			description: 'laborum et dolorum fuga',
			newpr: '$2,399',
			oldpr: '$5,699',
			off: '72% off',
			Offerprice: 'Offer Price $2,399',
			color: "secondary-transparent"
		},
	],

};

export default function reducer(state = initialState, action: any) {
	const { type, payload } = action;

	switch (type) {

		case "ThemeChanger":
			state = payload;
			return state;
			break;

		case "PRODUCT":
			state.ecommercedata = state.ecommercedata.filter((idx: any) => {
				return idx.id == payload;
			});
			return state;
			break;

		default:
			return state;
	}
}
