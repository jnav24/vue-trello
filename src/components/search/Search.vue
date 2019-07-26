<style src="./search.scss" lang="scss" scoped></style>

<template>
	<div id="search">
		<v-layout justify-center>
			<v-flex lg8 xl8>
				<v-card>
					<v-card-title style="justify-content: center">
						<h1>Search Trello</h1>
					</v-card-title>

					<v-card-text>
						<v-layout>
							<v-select
								v-model="form.board.value"
								:items="allBoards"
								@change="updateBoard()"
								item-value="id"
								item-text="name"
								label="Boards"></v-select>
						</v-layout>

						<v-layout>
							<v-flex lg3 xl3>
								<v-text-field
									:disabled="!getSelected.board || !getSelected.board.trim()"
									v-model="form.search.value"
									@blur="updateSearch()"
									@keyup.enter="updateSearch()"
									label="Search by name"></v-text-field>
							</v-flex>

							<v-spacer></v-spacer>

							<v-flex lg3 xl3>
								<v-select
									:disabled="!allLists.length"
									v-model="form.list.value"
									@change="updateList()"
									:items="allLists"
									item-value="id"
									item-text="name"
									label="Lists"></v-select>
							</v-flex>

							<v-spacer></v-spacer>

							<v-flex lg3 xl3>
								<v-select
									:disabled="!allLabels.length"
									v-model="form.label.value"
									@change="updateLabel()"
									:items="allLabels"
									item-value="id"
									item-text="name"
									label="Labels"></v-select>
							</v-flex>
						</v-layout>
					</v-card-text>

					<v-card-actions style="justify-content: center; padding-bottom: 15px;">
						<v-btn
							@click="resetForm(true)">Reset</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex'

	export default {
		computed: {
			...mapGetters([
				'allBoards',
				'allLabels',
				'allLists',
				'getSelected',
			]),
		},
		data() {
			return {
				form: {
					board: {
						value: '',
					},
					label: {
						value: '',
					},
					list: {
						value: '',
					},
					search: {
						value: '',
					},
				},
			}
		},
		methods: {
			...mapActions([
				'getAllCards',
				'getAllLabels',
				'getAllLists',
			]),
			...mapMutations([
				'addSelectedBoard',
				'addSelectedLabel',
				'addSelectedList',
				'addSelectedSearch',
				'resetCardsState',
				'resetLabelsState',
				'resetListsState',
				'resetSelectedState',
			]),
			resetEverything() {
				this.resetCardsState()
				this.resetLabelsState()
				this.resetListsState()
				this.resetForm()
			},
			resetForm(resetBoards = false) {
				if (resetBoards) {
					this.form.board.value = ''
				}

				this.form.label.value = ''
				this.form.list.value = ''
				this.form.search.value = ''
				this.resetSelectedState()
			},
			updateBoard() {
				this.resetEverything()
				this.addSelectedBoard(this.form.board.value)
				this.getAllCards()
				this.getAllLabels()
				this.getAllLists()
			},
			updateList() {
				this.addSelectedList(this.form.list.value)
			},
			updateLabel() {
				this.addSelectedLabel(this.form.label.value)
			},
			updateSearch() {
				this.addSelectedSearch(this.form.search.value)
			},
		},
	}
</script>
