/**
 * Generic type converter.
 */
export interface Converter<Source, Target> {
    /**
     * Converts from source to target.
     * @param source Object of type Source to convert to type Target.
     * @return Converted object of type Target.
     */
    convertToTarget(source: Source): Target;

    /**
     * Converts from target to source.
     * @param target Object of type Target to convert to type Source.
     * @return Converted object of type Source.
     */
    convertToSource(target: Target): Source;
}
