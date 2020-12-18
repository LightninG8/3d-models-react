
import React, {useEffect, useState} from "react";

import './app.css';
// import model from "../../models/monkey/monkey.gltf";
// import model from "../../models/peoples/women.glb";
import model from "../../models/peoples/womandress/womendress.gltf";
// import model from "../../models/DamagedHelmet/DamagedHelmet.gltf";

// import texture0 from "../../models/monkey/monkey_img0.png";
// import texture1 from "../../models/monkey/Untitled.001.png";
// import texture2 from "../../models/monkey/Untitled.002.png";
// import texture4 from "../../models/monkey/Untitled.004.png";

// import texture0 from "../../models/peoples/womandress/FabricUpholsteryMidCenturyPebbles001_COL_VAR1_1K.jpg";
import texture0 from "../../models/peoples/womandress/FabricUpholsteryMidCenturyPebbles001_COL_VAR1_2K.jpeg";
import texture1 from "../../models/peoples/womandress/FabricUpholsteryMidCenturyPebbles001_NRM_1K.jpg";
import texture2 from "../../models/peoples/womandress/FabricUpholsteryMidCenturyPebbles001_REFL_1K.jpg";
import texture4 from "../../models/peoples/womandress/womendress_img2.png";


function App() {
	const [metalness, setMetalness] = useState(0);
	const [roughness, setRoughness] = useState(0);

	useEffect(() => {
		const modelViewerTexture = document.querySelector("model-viewer#lantern");

		function changeTexture() {
			const materials = modelViewerTexture.model.materials;

			const material = materials[0];

			console.log(modelViewerTexture.model.materials);

			// Текстуры
			const applyPBRTexture = (channel, event) => {
				// console.log(event.target.options[event.target.options.selectedIndex].dataset[channel]);
				material.pbrMetallicRoughness[channel].texture.source.setURI(event.target.options[event.target.options.selectedIndex].dataset[channel]);
			};
			const applyNormalTexture = (channel, event) => {
				// console.log(event.target.options[event.target.options.selectedIndex].dataset[channel]);
				material.normalTexture.texture.source.setURI(event.target.options[event.target.options.selectedIndex].dataset[channel]);
			};
			
			document.querySelector('#diffuse').addEventListener('input', (event) => {
				applyPBRTexture('baseColorTexture', event);
				applyPBRTexture('metallicRoughnessTexture', event);
				applyNormalTexture('normalTexture', event);
			});
			
			// document.querySelector('#metallicRoughness').addEventListener('input', (event) => {
			// 	applyPBRTexture('metallicRoughnessTexture', event);
			// });

			// Ползунки
			document.querySelector('#metalness').addEventListener('input', () => {
				material.pbrMetallicRoughness.setMetallicFactor(event.target.value);
			});
			
			document.querySelector('#roughness').addEventListener('input', () => {
				material.pbrMetallicRoughness.setRoughnessFactor(event.target.value);
			});
		}
		modelViewerTexture.addEventListener("scene-graph-ready", changeTexture);

		return function() {
			modelViewerTexture.removeEventListener("scene-graph-ready", changeTexture);
		};
	});
	


	function onChangeRange(event) {
		return event.target.value;
	}


	return (
		<div className="app" >
			<div className="app__body container">
				<model-viewer 
					id="lantern" 
					class="model-viewer" 
					camera-controls src={model} 
					alt="A 3D model of a helmet">
	
				</model-viewer>
				<div id="controls">
					<div>
					<p>Diffuse</p>
					<select id="diffuse">
						<option >Texture 0</option>
						<option value={texture1} data-normal-texture={texture1} data-base-color-texture={texture0} data-metallic-roughness-texture={texture2}>Texture 1</option>
						<option value={texture2}>Texture 2</option>
						<option value={texture4}>Texture 4</option>
					</select>
					</div>
					<div>
					<p>Metallic-roughness</p>
					<select id="metallicRoughness">
						<option data-type="allMaps" value="https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/DamagedHelmet/glTF/Default_metalRoughness.jpg">Texture 4</option>
						<option data-type="allMaps" value="https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/Lantern/glTF/Lantern_roughnessMetallic.png">Texture 5</option>
						<option data-type="allMaps" value="https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/WaterBottle/glTF/WaterBottle_occlusionRoughnessMetallic.png">Texture 6</option>
					</select>
					</div>
					<div>
						<p>Metalness: <span id="metalness-value">{metalness}</span></p>
						<input id="metalness" type="range" min="0" max="1" step="0.01" value={metalness} onChange={(event) => setMetalness(onChangeRange(event))}></input>
					</div>
					<div>
						<p>Roughness: <span id="roughness-value">{roughness}</span></p>
						<input id="roughness" type="range" min="0" max="1" step="0.01" value={roughness} onChange={(event) => setRoughness(onChangeRange(event))}></input>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
