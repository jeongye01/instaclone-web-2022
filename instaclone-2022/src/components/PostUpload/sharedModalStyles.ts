interface ImodalStyles{
  overlay:any;
  content:any;
}
const modalStyles:ImodalStyles = {
  overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.83)",
		zIndex: 10,
	},
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    
  },
};


export default modalStyles;