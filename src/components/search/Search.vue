<style src="./search.scss" lang="scss" scoped></style>

<template>
	<div id="search">
		<v-layout justify-center>
			<v-flex lg8 xl8>
				<v-card>
					<v-card-title>
						<h1>Search Trello</h1>
					</v-card-title>

					<v-card-text>
						<pre>{{ getSelected }}</pre>
						<v-layout>
							<v-flex lg3 xl3>
								<v-select
									v-model="form.board.value"
									:items="allBoards"
									@change="updateBoard()"
									item-value="id"
									item-text="name"
									label="Boards"></v-select>
							</v-flex>

							<v-spacer></v-spacer>

							<v-flex lg3 xl3>
								<v-select
									:disabled="!allLists"
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
									:disabled="!allLabels"
									v-model="form.label.value"
									:items="allLabels"
									item-value="id"
									item-text="name"
									label="Cards"></v-select>
							</v-flex>
						</v-layout>
					</v-card-text>
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
				'addSelectedList',
			]),
			updateBoard() {
				this.addSelectedBoard(this.form.board.value)
				this.getAllCards()
				this.getAllLabels()
				this.getAllLists()
			},
			updateList() {
				this.addSelectedList(this.form.list.value)
			}
		},
	}
</script>
