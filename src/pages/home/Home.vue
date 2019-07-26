<style src="./home.scss" lang="scss" scoped></style>

<template>
	<div id="home">
		<Search></Search>

		<v-layout style="margin-top: 65px;" justify-center>
			<v-flex lg8	xl8>
				<div v-if="isEmpty(getSelected.board)">
					Select board to display cards
				</div>

				<div v-if="!isEmpty(getSelected.board) && !allCards.length">
					<div v-if="!isLoading">
						This board has no cards
					</div>

					<div v-if="isLoading">
						<p>Trello cards are loading...</p>

						<v-progress-circular
							indeterminate></v-progress-circular>
					</div>
				</div>

				<div v-if="!isEmpty(getSelected.board) && allCards.length">
					<h2>Showing {{ allCards.length }} Cards</h2>

					<v-container grid-list-md style="padding-left: 0;padding-right: 0;">
						<v-layout justify-space-evenly row wrap>
							<v-flex
								lg4 xl4
								:key="card.id"
								v-for="(card) in allCards">
								<v-card class="card-container">
									<v-card-text style="overflow: hidden; text-align: left">
										<h3 class="card-header">{{ card.name }}</h3>
										<p class="card-desc">
											{{ card.desc.substr(0,250) }}<span v-if="card.desc.length > 250">...</span>
										</p>
										<div class="card-labels">
											<v-chip
												:key="int"
												v-for="(label, int) in card.idLabels">
												{{ getLabelName(label) }}
											</v-chip>
										</div>
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
				'getSelected',
				'isLoading',
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
