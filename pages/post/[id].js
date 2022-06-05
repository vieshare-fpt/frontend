import { Box, CardMedia, Container, dividerClasses, Fab, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from '@mui/material'
import React from 'react'
import Layout from 'src/components/Layout'

import { styled } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import ShareIcon from '@mui/icons-material/Share';
import Category from 'src/components/post/Category';


const actions = [
	{ icon: <FacebookIcon />, name: 'Facebook', },

];


const PostBody = {
	margin: {
		lg:'0 30%',
		sm: '0 5%',
		xs: '0 0'
	},

}

const Post = ({ post }) => {
	return (
		<Layout>
			<Box sx={PostBody}>
				<Category />

				<Grid container>
					<p>Hello</p>

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
			</Box>
		</Layout>

	)
}




// export const getStaticPaths = async () => {
// 	const paths = await getPostTrendingIds()
// 	return {
// 		paths,
// 		// fallback: false // bat ki path nao k returned boi getStaticPaths se toi trang 404
// 		fallback: false // path nao k returned ngay lap tuc se show trang "tam thoi" => doi getStaticProps chay
// 		// => getStaticProps chay xong => return trang hoan chinh
// 	}
// }

// export const getStaticProps = async ({ params }) => {
// 	const post = await getPostTrendingById(params.id)

// 	return {
// 		props: {
// 			post
// 		}
// 	}
// }

export default Post