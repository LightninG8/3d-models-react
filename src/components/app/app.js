
import React, {useEffect} from "react";

import './app.css';
import model from "../../models/DamagedHelmet.gltf";

function App() {
	

	useEffect(() => {
		const modelViewerTexture = document.querySelector("model-viewer#lantern");

		modelViewerTexture.addEventListener("scene-graph-ready", () => {

		let material = modelViewerTexture.model.materials[0];

		let applyPBRTexture = (channel, event) => {
			material.pbrMetallicRoughness[channel].texture.source.setURI(event.target.value);
		};
		
		document.querySelector('#diffuse').addEventListener('input', (event) => {
			applyPBRTexture('baseColorTexture', event);
		});
		
		document.querySelector('#metallicRoughness').addEventListener('input', (event) => {
			applyPBRTexture('metallicRoughnessTexture', event);
		});
		});
	});






	return (
		<div className="app" >
			<div className="app__body container">
				<model-viewer id="lantern" class="model-viewer" camera-controls src={model} alt="A 3D model of a helmet">
				<div id="controls">
					<div>
					<p>Diffuse</p>
					<select id="diffuse">
						<option value="https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/DamagedHelmet/glTF/Default_albedo.jpg">Damaged helmet</option>
						<option value="https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/Lantern/glTF/Lantern_baseColor.png">Lantern Pole</option>
						<option value="https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/WaterBottle/glTF/WaterBottle_baseColor.png">Water Bottle</option>
					</select>
					</div>
					<div>
					<p>Metallic-roughness</p>
					<select id="metallicRoughness">
						<option value="https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/DamagedHelmet/glTF/Default_metalRoughness.jpg">Damaged helmet</option>
						<option value="https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/Lantern/glTF/Lantern_roughnessMetallic.png">Lantern Pole</option>
						<option value="https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/WaterBottle/glTF/WaterBottle_occlusionRoughnessMetallic.png">Water Bottle</option>
					</select>
					</div>
				</div>
				</model-viewer>
			</div>
		</div>
	);
}

export default App;
