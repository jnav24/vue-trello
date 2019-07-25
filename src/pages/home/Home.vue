<template>
	<div id="home">
		<Search></Search>

		<v-layout justify-center>
			<v-flex lg8	xl8>
				<div v-if="isEmpty(getSelected.board)">
					Select board to display cards
				</div>

				<pre>{{ allCards }}</pre>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Search from '@/components/search/Search'

	export default {
		components: {
			Search,
		},
		computed: {
			...mapGetters([
				'allCards',
				'getSelected'
			]),
		},
		created() {
			this.$store.dispatch('getAllBoards')
		},
		methods: {
			isEmpty(value) {
				return !value && !value.trim()
			},
		}
	}
</script>
