
import React, {useEffect, useState} from "react";

import './app.css';
import model from "../../models/monkey/monkey.gltf";
// import model from "../../models/DamagedHelmet/DamagedHelmet.gltf";

import texture1 from "../../models/monkey/Untitled.001.png";
import texture2 from "../../models/monkey/Untitled.002.png";
import texture4 from "../../models/monkey/Untitled.004.png";

function App() {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		
		const modelViewerTexture = document.querySelector("model-viewer#lantern");


		modelViewerTexture.addEventListener("scene-graph-ready", () => {

			let material = modelViewerTexture.model.materials[0];

			console.log(material);

			// Текстуры
			let applyPBRTexture = (channel, event) => {
				material.pbrMetallicRoughness[channel].texture.source.setURI(event.target.value);
				console.log(material.pbrMetallicRoughness[channel]);
			};
			
			document.querySelector('#diffuse').addEventListener('input', (event) => {
				applyPBRTexture('baseColorTexture', event);
			});
			
			document.querySelector('#metallicRoughness').addEventListener('input', (event) => {
				applyPBRTexture('metallicRoughnessTexture', event);
			});

			// Ползунки
			let metalnessDisplay = document.querySelector("#metalness-value");
			let roughnessDisplay = document.querySelector("#roughness-value");

			metalnessDisplay.textContent = material.pbrMetallicRoughness.metallicFactor;
			roughnessDisplay.textContent = material.pbrMetallicRoughness.roughnessFactor;

			material.pbrMetallicRoughness.setBaseColorFactor([0.7294, 0.5333, 0.0392]);

			document.querySelector('#metalness').addEventListener('input', (event) => {
				material.pbrMetallicRoughness.setMetallicFactor(event.target.value);
				metalnessDisplay.textContent = event.target.value;
			});
			
			document.querySelector('#roughness').addEventListener('input', (event) => {
				material.pbrMetallicRoughness.setRoughnessFactor(event.target.value);
				roughnessDisplay.textContent = event.target.value;
			});
		});
	});
	




	return (
		<div className="app" >
			<div className="app__body container">
				<model-viewer id="lantern" class="model-viewer" camera-controls src={model} alt="A 3D model of a helmet">
				
				</model-viewer>
				<div id="controls">
					<div>
					<p>Diffuse</p>
					<select id="diffuse">
						<option value={texture1}>Texture 1</option>
						<option value={texture2}>Texture 2</option>
						<option value={texture4}>Texture 4</option>
					</select>
					</div>
					<div>
					<p>Metallic-roughness</p>
					<select id="metallicRoughness">
						<option value="https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/DamagedHelmet/glTF/Default_metalRoughness.jpg">Texture 4</option>
						<option value="https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/Lantern/glTF/Lantern_roughnessMetallic.png">Texture 5</option>
						<option value="https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/WaterBottle/glTF/WaterBottle_occlusionRoughnessMetallic.png">Texture 6</option>
					</select>
					</div>
					<div>
						<p>Metalness: <span id="metalness-value"></span></p>
						<input id="metalness" type="range" min="0" max="1" step="0.01" value="1"></input>
					</div>
					<div>
						<p>Roughness: <span id="roughness-value"></span></p>
						<input id="roughness" type="range" min="0" max="1" step="0.01" value="0"></input>
					</div>
					<button onClick={() => setCounter(counter + 1)}>Кнопка</button>
				</div>
			</div>
		</div>
	);
}

export default App;
