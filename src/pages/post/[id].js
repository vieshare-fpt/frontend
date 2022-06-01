import { CardMedia, dividerClasses, Fab, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from '@mui/material'
import React from 'react'
import Layout from '../../components/Layout'

import { styled } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import ShareIcon from '@mui/icons-material/Share';


const actions = [
	{ icon: <FacebookIcon />, name: 'Facebook', },

];


const PostBody = styled('p')({
	display: '-webkit-box',
	fontSize: '20px',
	fontWeight: '400',
	lineHeight: '23px',
	WebkitLineClamp: '2',
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	margin: '0'
})


const styleBox = {
	backgroundColor: 'red',
	margin: '0 auto',
	width: 235,
	height: 256,
	left: 1149,
	top: 183,
	border: '1px solid #000000',
	background: 'rgba(126, 126, 126, 0.2)',
	backdropFilter: "blur(50px)",
	borderRadius: '24px',
	pt: 1.5,
	px: 1.5,

}
const Post = ({ post }) => {
	return (
		<Layout>
			<Grid container>
				

			</Grid>

			<SpeedDial
				ariaLabel="SpeedDial basic example"
				sx={{ position: 'fixed', bottom: 80, right: '5%', }}
				FabProps={{ color: 'success', }}
				icon={<ShareIcon />}
			>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
					/>
				))}

			</SpeedDial>


		</Layout>

	)
}




export const getStaticPaths = async () => {
	const paths = await getPostTrendingIds()
	return {
		paths,
		// fallback: false // bat ki path nao k returned boi getStaticPaths se toi trang 404
		fallback: false // path nao k returned ngay lap tuc se show trang "tam thoi" => doi getStaticProps chay
		// => getStaticProps chay xong => return trang hoan chinh
	}
}

export const getStaticProps = async ({ params }) => {
	const post = await getPostTrendingById(params.id)

	return {
		props: {
			post
		}
	}
}

export default Post