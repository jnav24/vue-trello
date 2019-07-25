<style src="./search.scss" lang="scss" scoped></style>

<template>
	<div id="search">
		<v-layout justify-center>
			<v-flex lg8 xl8>
				<v-card>
					<v-card-text>
						<v-select
							v-model="form.boards.value"
							:items="allBoards"
							item-value="id"
							item-text="name"
							label="boards"></v-select>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		computed: {
			...mapGetters([
				'allBoards',
			]),
		},
		data() {
			return {
				form: {
					boards: {
						value: '',
					},
				},
			}
		},
	}
</script>
