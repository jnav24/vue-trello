<template>
	<div id="home">
		<Search></Search>

		<v-layout justify-center>
			<v-flex lg8	xl8>
				<div v-if="isEmpty(getSelected.board)">
					Select board to display cards
				</div>

				<div v-if="!isEmpty(getSelected.board) && !allCards.length">
					This board has no cards
				</div>

				<div v-if="!isEmpty(getSelected.board) && allCards.length">
					<h2>Showing {{ allCards.length }} Cards</h2>

					<v-container grid-list-md style="padding-left: 0;padding-right: 0;">
						<v-layout justify-space-evenly row wrap>
							<v-flex
								lg4 xl4
								:key="card.id"
								v-for="(card) in allCards">
								<v-card>
									<v-card-text style="text-align: left">
										<pre>{{ card }}</pre>
										<h3 style="height: auto; max-height: 50px; overflow: hidden; text-overflow: ellipsis;white-space: nowrap; width: 100%;">{{ card.name }}</h3>
										<p>{{ card.desc }}</p>
										<v-chip
											:key="int"
											v-for="(label, int) in card.idLabels">
											{{ getLabelName(label) }}
										</v-chip>
									</v-card-text>
								</v-card>
							</v-flex>
						</v-layout>
					</v-container>
				</div>
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
				'allLabels',
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
			getLabelName(label) {
				const obj = this.allLabels.find((lab) => lab.id === label)

				if (typeof obj !== 'undefined' && typeof obj.name !== 'undefined') {
					return obj.name
				}
			},
		}
	}
</script>
