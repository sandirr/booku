const styles ={
  root:{
    backgroundColor:'#EDF4F7',
    minHeight:'100vh',
    paddingBottom:20,
    boxSizing:'border-box',
    '& .no-data':{
      textAlign:'center',
      marginTop:20,
      fontSize:18,
      fontWeight:'500'
    },
    '& .card-item':{
      boxShadow:'0 0 8px rgba(0,0,0,.1)', 
      position:'relative',
      borderRadius:10,
      '& .category':{
        backgroundColor:'#EAF5FA', 
        color:'#229BD8',
        padding:'6px 10px 6px 5px',
        display:'inline-block',
        borderRadius:'0 25px 25px 0',
        position:'absolute',
        top:90,
        left:0,
        fontSize:12,
        fontWeight:'500'
      },
    }
  },
  paperBar:{ 
    bgcolor: '#fff', 
    borderRadius:'16px !important', 
    overflow:'hidden !important',
    boxShadow:'0 0 8px rgba(0,0,0,.1) !important',
  },
  tabs:{
    '& .tab':{
      textTransform:'none', 
      fontSize:14, 
      fontWeight:'400 !important'
    },
  },
  noBorder:{
    border: 'none !important',
  }
};
export default styles;