import { it, expect } from "bun:test"
import { Project } from "lib/Project"
import { Chip } from "lib/components/normal-components/Chip"
import "lib/register-catalogue"

it("should create a Chip component with correct properties", () => {
  const project = new Project()

  project.add(
    <board width="10mm" height="10mm">
      <chip
        name="U1"
        footprint="soic8"
        pinLabels={{
          "1": "VCC",
        }}
        schPortArrangement={{
          leftSize: 4,
          rightSize: 4,
        }}
      />
    </board>,
  )

  project.render()

  const chip = project.selectOne("chip") as Chip

  expect(chip).not.toBeNull()
  expect(chip.props.name).toBe("U1")

  // Check if ports are created correctly
  const ports = chip.children.filter((c) => c.componentName === "Port")
  expect(ports).toHaveLength(8)

  // Check specific ports
  const vccPort = chip.selectOne("port[name='VCC']")
  expect(vccPort).not.toBeNull()
  expect(vccPort!.props.pinNumber).toBe(1)

  const gndPort = chip.selectOne("port[name='GND']")
  expect(gndPort).not.toBeNull()
  expect(gndPort!.props.pinNumber).toBe(2)

  // Test schematic rendering
  expect(chip.schematic_component_id).not.toBeNull()

  // Test PCB rendering
  expect(chip.pcb_component_id).not.toBeNull()
})
