import styled, { css } from '@emotion/native'
import isPropValid from '@emotion/is-prop-valid'
const Spacer = styled.View`
  display: flex;
  flex:1;
  height: 60px;
`
const RCText = styled.Text`
display: flex;
font-size: 20px;
`
const RCView = styled.View`
display:flex;
flex-direction:row;
background-color:white;
height:50px;
margin:10px 20px;
padding:0px 20px;
border-radius:20px;
justify-content:flex-start;
align-items:center;
` 
const RCViewCenter = styled.View`
align-self:center;
justify-content:center;
align-items:center;
padding: 20px;
background-color:white;
border-radius: 20px;
`


export {Spacer, RCText, RCView, RCViewCenter};