export default function useCamera({camera, objects}) {
    const blocks = objects.filter(object => object?.type == "block")
    
    if(camera.position.y < blocks.length + 2) {
        camera.position.y += 0.15
    }
}