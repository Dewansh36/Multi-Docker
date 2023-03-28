import React, { Component } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Fib() {
	const [seenIndexes, setseenIndexes] = useState([]);
	const [values, setvalues] = useState({});
	const [index, setIndex] = useState('');

	async function fetchValues() {
		const values = await axios.get('/api/values/current');
		setvalues(values.data);
		// this.setState({ values: values.data });
	}

	async function fetchIndexes() {
		const seenIndexes = await axios.get('/api/values/all');
		setseenIndexes(seenIndexes.data);
	}

	useEffect(() => {
		fetchIndexes();
		fetchValues();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		await axios.post('/api/values', {
			index: index,
		});
		setIndex('');
		await fetchIndexes();
		await fetchValues();
	};

	function renderSeenIndexes() {
		if(seenIndexes.length === 0) return <div>No indexes seen yet</div>
		return seenIndexes.map(({ number }) => number).join(', ');
	}

	function renderValues() {
		const entries = [];

		for (let key in values) {
			entries.push(
				<div key={key}>
					For index {key} I calculated {values[key]}
				</div>
			);
		}

		return entries;
	}

	return (
		<div>
			<h1>Hello World</h1>
			<form onSubmit={handleSubmit}>
				<label>Enter your index:</label>
				<input
					value={index}
					onChange={(event) => setIndex(event.target.value)}
				/>
				<button>Submit</button>
			</form>

			<h3>Indexes I have seen:</h3>
			{renderSeenIndexes()}

			<h3>Calculated Values:</h3>
			{renderValues()}
		</div>
	);
}

// class Fib extends Component {
//   state = {
//     seenIndexes: [],
//     values: {},
//     index: '',
//   };

//   componentDidMount() {
//     this.fetchValues();
//     this.fetchIndexes();
//   }

//   async fetchValues() {
//     const values = await axios.get('/api/values/current');
//     this.setState({ values: values.data });
//   }

//   async fetchIndexes() {
//     const seenIndexes = await axios.get('/api/values/all');
//     this.setState({
//       seenIndexes: seenIndexes.data,
//     });
//   }

//   handleSubmit = async (event) => {
//     event.preventDefault();

//     await axios.post('/api/values', {
//       index: this.state.index,
//     });
//     this.setState({ index: '' });
//   };

//   renderSeenIndexes() {
//     return this.state.seenIndexes.map(({ number }) => number).join(', ');
//   }

//   renderValues() {
//     const entries = [];

//     for (let key in this.state.values) {
//       entries.push(
//         <div key={key}>
//           For index {key} I calculated {this.state.values[key]}
//         </div>
//       );
//     }

//     return entries;
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <label>Enter your index:</label>
//           <input
//             value={this.state.index}
//             onChange={(event) => this.setState({ index: event.target.value })}
//           />
//           <button>Submit</button>
//         </form>

//         <h3>Indexes I have seen:</h3>
//         {this.renderSeenIndexes()}

//         <h3>Calculated Values:</h3>
//         {this.renderValues()}
//       </div>
//     );
//   }
// }

export default Fib;
