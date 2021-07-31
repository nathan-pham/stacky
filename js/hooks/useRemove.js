export default function useRemove({objects, remove}) {
    objects = objects.filter(object => object.remove ? remove(object) : true)
}