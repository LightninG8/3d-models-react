
import React, {useEffect, useState} from "react";

import './app.css';

import settingsIcon from "../../components/app/icon.png";


import model from "../../models/peoples/womandress/womendress.gltf";

import textureNone from "../../models/peoples/womandress/noneTexture.jpg";
import texture1col from "../../models/peoples/womandress/FabricUpholsteryMidCenturyPebbles001_COL_VAR1_1K.jpg";
import texture2col from "../../models/peoples/womandress/FabricUpholsteryMidCenturyPebbles001_COL_VAR1_2K.jpeg";
import texture3col from "../../models/peoples/womandress/FabricUpholsteryMidCenturyPebbles001_COL_VAR1_3K.jpeg";

import texture1refl from "../../models/peoples/womandress/FabricUpholsteryMidCenturyPebbles001_REFL_1K.jpg";
import texture2refl from "../../models/peoples/womandress/womendress_img2.png";

import texture1nor from "../../models/peoples/womandress/FabricUpholsteryMidCenturyPebbles001_NRM_1K.jpg";
import texture2nor from "../../models/peoples/womandress/FabricUpholsteryMidCenturyPebbles001_NRM_2K.jpeg";

function App() {
	const [metalness, setMetalness] = useState(0);
	const [roughness, setRoughness] = useState(1);

	useEffect(() => {
		const modelViewerTexture = document.querySelector("model-viewer#lantern");

		function changeTexture() {
			const materials = modelViewerTexture.model.materials;

			const material = materials[0];

			console.dir(material);

			// Текстуры
			const applyPBRTexture = (channel, event) => {
				material.pbrMetallicRoughness[channel].texture.source.setURI(event.target.value);
			};
			const applyTexture = (channel, event) => {
				material[channel].texture.source.setURI(event.target.value);
			};
			// const applyTexture = (channel, event) => {
			// 	material[channel].texture.source.setURI(event.target.value);
			// };

			
			document.querySelector('#diffuse').addEventListener('input', (event) => {
				applyPBRTexture('baseColorTexture', event);
			});
			
			document.querySelector('#metallicRoughness').addEventListener('input', (event) => {
				applyPBRTexture('metallicRoughnessTexture', event);
			});
			document.querySelector('#normal').addEventListener('input', (event) => {
				applyTexture('normalTexture', event);
			});

			// document.querySelector('#occlusion').addEventListener('input', (event) => {
			// 	applyTexture('occlusionTexture', event);
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

	function toggleSettingsVisible() {
		const settings = document.querySelector("#controls");
		settings.hidden = !settings.hidden;

		if (!settings.hidden) {
			settings.style.display = "flex";
		} else {
			settings.style.display = "none";
		}
	}
	return (
		<div className="app" >
			<div className="app__body">
				<model-viewer 
					id="lantern" 
					class="model-viewer" 
					camera-controls src={model} 
					alt="A 3D model of a helmet"
					exposure="1" 
					skybox-image="https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr"
					>
					<div id="controlsBurger" onClick={toggleSettingsVisible}>
						<img src={settingsIcon} alt="" className="controlsBurger__icon"/>
					</div>
					<div id="controls">
						<div>
							<p>Diffuse</p>
							<select id="diffuse">
								<option value={texture1col}>Texture 1</option>
								<option value={texture2col}>Texture 2</option>
								<option value={texture3col}>Texture 3</option>
								<option value={textureNone}>None</option>
							</select>
						</div>
						<div>
							<p>Metallic-roughness</p>
							<select id="metallicRoughness">
								<option value={texture1refl}>Texture 1</option>
								<option value={texture2refl}>Texture 2</option>
								<option value={textureNone}>None</option>
							</select>
						</div>
						<div>
							<p>Normal map</p>
							<select id="normal">
								<option value={texture1nor}>Texture 1</option>
								<option value={texture2nor}>Texture 2</option>
								<option value={textureNone}>None</option>
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
	
				</model-viewer>
				
			</div>
		</div>
	);
}

export default App;
