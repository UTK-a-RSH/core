import { test, expect } from "bun:test"
import type { Chip } from "lib/components"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

const HigherOrderComponent = () => {
  return (
    <group>
      <chip name="U1" footprint="soic8" />
    </group>
  )
}

test("should create a project with a higher-order component", async () => {
  const { project } = getTestFixture()

  // project.add(<chip name="U1" footprint="soic8" />)
  project.add(<HigherOrderComponent />)

  project.render()

  const chip = project.selectOne("chip") as Chip

  expect(chip).not.toBeNull()
  expect(chip.props.name).toBe("U1")
})